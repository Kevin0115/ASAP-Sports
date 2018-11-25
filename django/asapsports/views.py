import json
import uuid

import psycopg2
import datetime

from .db.users import insert_user, get_user_by_asap_token, get_user_by_fb_id, get_user_by_id, update_user_by_id
from .db.games import insert_game, get_game, search_games
from .db.user_in_game import insert_user_in_game, get_dashboard, num_users_in_game, get_users, Status
from . import utils
from . import facebook as fb


##### AUTHENTICATION #####

def login(request):
        """
        :param request: {'fb_access_token': str, 'device_id': str}. device_id is the ID of the device that we can send push notifications to
        :return: {'asap_access_token': str}
        
        TODO: Add an error message when user access token has expired and we need to
            take the user through login flow again.
        """

        # TODO: Check for ASAP Access Token header and return if valid???

        try:
            post_params = json.loads(request.read())
            fb_access_token = post_params['fb_access_token']
            # device_id = request.POST['device_id']
        except KeyError:
            return utils.json_client_error("Missing required parameter")
        except json.JSONDecodeError:
            return utils.json_client_error("Invalid JSON")

        try:
            fb_access_token, expiry = fb.get_long_lived_access_token(fb_access_token)
            fb_id, first, last, profile_pic_url = fb.get_user_info(fb_access_token)
        except fb.FacebookAPIException as e:
            return utils.json_client_error("Failed to reach Facebook. %s" % str(e))
        asap_access_token = uuid.uuid4()    
        try:
            insert_user(request.db_conn, fb_id, first, last, None, None, None, fb_access_token,
                    profile_pic_url, asap_access_token)
            user = get_user_by_asap_token(request.db_conn, asap_access_token)
        except psycopg2.IntegrityError:
            request.db_conn.rollback()
            user = get_user_by_fb_id(request.db_conn, fb_id)

        asap_access_token = str(user.asap_access_token) # TODO user.to_json() is broken because it modifies the user object. Fix that
        res = user.to_json()
        res.update({'asap_access_token': asap_access_token})
        return utils.json_response(res)


##### GAMES #####

def upcoming_games(request):
    """
    :param request: Only requires ASAP access token in the header key asap_access_token
    :return:
            {
                'auth_user': user,
                'games_in_progess': [game],
                'games_upcoming': [game],
                'past_games': [game]
            }
    """
    user = get_user_by_asap_token(request.db_conn, utils.sanitize_uuid(request.META['HTTP_AUTHORIZATION']))
    if user is None:
        return utils.json_client_error("Bad authorization")

    games_upcoming, games_in_progress, past_games = get_dashboard(request.db_conn, user.id)

    res = {'auth_user': user.to_json(),
           'games_in_progress': [x.to_json() for x in games_in_progress],
           'games_upcoming': [x.to_json() for x in games_upcoming],
           'past_games': [x.to_json() for x in past_games]}
    return utils.json_response(res)


def search(request):
    # TODO fix timezone situations. This applies to both the front and backend. Big problem but not important until after demo
    """
    :param request: {
          'radius_m': int,
          'location_lng': float,
          'location_lat': float,
          'start_time': dd-mmm-yyyy hh:mm(default=now),
          'sport': enum(default=null),
          'page_num': int(default=0)
        }
    :return: [game]
    """
    try:
        lng = utils.sanitize_float(request.GET['lng'])        
        lat = utils.sanitize_float(request.GET['lat'])
        radius_m = utils.sanitize_int(request.GET['radius_m'])
        start_time = utils.sanitize_datetime(request.GET['start_time'])
        sport = utils.sanitize_sport(request.GET['sport']) if request.GET['sport'] != 'any' else 'any'
    except KeyError as e:
        return utils.json_client_error('Missing a required parameter: "%s"' % e)

    for key in ['lng', 'lat', 'radius_m', 'start_time', 'sport']:
        if locals()[key] is None:
            utils.json_client_error('Could not parse parameter "%s". Received "%s".' % (key, request.GET[key]))

    if start_time < datetime.datetime.utcnow() - datetime.timedelta(hours=1):
        return utils.json_client_error("You can't search for games in the past.")

    games = search_games(request.db_conn, lng, lat, radius_m, start_time, sport, 0)
    return utils.json_response([g.to_json() for g in games])


def join(request, game_id):
    """
    :param request: ASAP access token header
    :param game_id: int, in URL
    :return:
    """
    user = get_user_by_asap_token(request.db_conn, utils.sanitize_uuid(request.META['HTTP_AUTHORIZATION']))
    if user is None:
        return utils.json_client_error("Bad authorization")

    # TODO lock on game row???
    game = get_game(request.db_conn, game_id)
    num_players = num_users_in_game(request.db_conn, game_id)
    if num_players == game.max_players:
        return utils.json_client_error("The game is already full.")

    insert_user_in_game(request.db_conn, user.id, game_id, Status.accepted)
    return utils.json_response({"status": "Successfully join game"})


def host(request):
    """
    :param request: has data like:
        {
           'title': str,
           'desc': str,
           'max_players': int,
           'sport': sport_type_enum,
           'start_time': str('YYYY-MM-DD HH:MM'),
           'duration': int minutes,
           'location_lng': float,
           'location_lat': float,
           'location_name': str,
           'comp_level': int E [1,3]
        }
    :return: {'game_id': game_id}
    """
    data = request.read()
    try:
        postdata = json.loads(data)
    except json.JSONDecodeError:
        return utils.json_client_error('Invalid JSON')

    try:
        game_title = postdata['title']
        game_description = postdata.get('desc')
        max_players = utils.sanitize_int(postdata['max_players'])
        sport = utils.sanitize_sport(postdata['sport'])
        start_time = utils.sanitize_datetime(postdata['start_time'])
        duration = utils.sanitize_int(postdata['duration'])
        if duration is None or duration <= 0:
            return utils.json_client_error("Bad duration")
        location_lng = utils.sanitize_float(postdata['location_lng'])
        location_lat = utils.sanitize_float(postdata['location_lat'])
        comp_level = utils.sanitize_int(postdata['comp_level'])
        location_name = postdata['location_name']
        asap_access_token = utils.sanitize_uuid(request.META['HTTP_AUTHORIZATION'])
    except KeyError as e:
        return utils.json_client_error("Missing parameter " + str(e))

    if asap_access_token is None:
       return utils.json_client_error("Bad access token.") 

    if start_time < datetime.datetime.utcnow() - datetime.timedelta(minutes=15):
        return utils.json_client_error("Bad start_time")

    l = locals()
    for x in ['max_players', 'sport', 'start_time', 'duration', 'location_lng',
              'location_lat', 'location_name', 'comp_level']:
        if l[x] is None:
            return utils.json_client_error("Missing or invalid parameter %s with bad value of %s" % (x, postdata[x]))

    end_time = start_time + datetime.timedelta(minutes=duration)

    user = get_user_by_asap_token(request.db_conn, asap_access_token)
    if user is None:
        return utils.json_client_error("Invalid access token.")

    game_id = insert_game(request.db_conn, user.id, game_title, game_description, max_players,
                            sport, start_time, end_time, location_lat, location_lng,
                            location_name, comp_level)
    insert_user_in_game(request.db_conn, user.id, game_id, Status.accepted)

    res = {'game_id': game_id}
    return utils.json_response(res)


def view(request, game_id):
    """
    :param request: ASAP access token header
    :param game_id: int, in URL
    :return: {
               'id': game_id,
               'host_id': user_id,
               'game_title': str,
               'game_description': str,
               'max_players': int,
               'sport': sport_type_enum,
               'start_time': str('YYYY-MM-DD HH:MM'),
               'end_time': str('YYYY-MM-DD HH:MM'),
               'location_lng': float,
               'location_lat': float,
               'location_name': str,
               'comp_level': int,
               'creation_timestamp': 'day_of_week, month day, year hh:mm AM/PM',
               'users": [
                    user_id,
                    user_id,
                    ...
                ]
             }
    """
    users = []
    res = get_game(request.db_conn, game_id).to_json()
    user_ids = get_users(request.db_conn, game_id)
    for user_id in user_ids:
        users.append(get_user_by_id(request.db_conn, user_id).to_json())
    res['users'] = users
    return utils.json_response(res)
    


##### NOTIFICATIONS #####

def subscribe2game(request, game_id):
    """
    :param request:
    :param game_id:
    :return:
    """
    res = {'status': 'success'}
    return utils.json_response(res)


##### USERS #####    

def get_current_user(request):
    """
    :param request:
    :return: {

                'id': int,
                'fb_id': int,
                'first': str,
                'last': str,
                'age': int,
                'gender': str,
                'bio': str, 
                'fb_access_token': str,
                'profile_pic_url': str(http://url.com),
                'creation_timestamp': 'day_of_week, month day, year hh:mm AM/PM',
             }
    """
    user = get_user_by_asap_token(request.db_conn, utils.sanitize_uuid(request.META['HTTP_AUTHORIZATION']))
    if user is None:
        return utils.json_client_error("Bad authorization")
    return utils.json_response(user.to_json())

def get_user(request, id):
    """
    :param request:
    :param id:
    :return: {

                'id': int,
                'fb_id': int,
                'first': str,
                'last': str,
                'age': int,
                'gender': str,
                'bio': str, 
                'fb_access_token': str,
                'profile_pic_url': str(http://url.com),
                'creation_timestamp': 'day_of_week, month day, year hh:mm AM/PM',

             }
    """
    user = get_user_by_id(request.db_conn, id)
    if user is None:
        return utils.json_client_error("Bad authorization")
    return utils.json_response(user.to_json())

def update_user(request):
    """
    :param request has data like:
                'id': int,
                'fb_id': int,
                'first': str,
                'last': str,
                'age': int,
                'gender': str,
                'bio': str, 
                'fb_access_token': str,
                'profile_pic_url': str(http://url.com),
             }
             update_user(conn, id, fb_id, first, last, age, gender, bio, fb_access_token,
                 profile_pic_url, asap_access_token)
    """
    data = request.read()
    postdata = json.loads(data)
    try:
        user_id = postdata['id']
        fb_id = postdata.get('fb_id')
        first = postdata['first']
        last = postdata['last']
        age = postdata.get('age')
        gender = postdata.get('gender')
        bio = postdata.get('bio')
        fb_access_token = postdata.get('fb_access_token')
        profile_pic_url = postdata.get('profile_pic_url')
        asap_access_token = utils.sanitize_uuid(request.META['HTTP_AUTHORIZATION'])
    except KeyError as e:
        return utils.json_client_error("Missing parameter " + str(e))

    if asap_access_token is None:
       return utils.json_client_error("Bad access token.")

    user = get_user_by_asap_token(request.db_conn, asap_access_token)
    if user is None:
        return utils.json_client_error("Invalid access token.")
    if user.id is not user_id:
        return utils.json_client_error("Invalid user update")

    update_user_by_id(request.db_conn, user_id, fb_id, first, last, age, gender, bio, fb_access_token,
                 profile_pic_url, asap_access_token)
    if user is None:
        return utils.json_client_error("Bad authorization")

    res = {'status': 'success'}
    return utils.json_response(res)

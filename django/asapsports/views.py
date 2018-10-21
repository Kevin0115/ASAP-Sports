import json
import uuid

import requests
import datetime

from django.core.mail import send_mail

from .db.users import insert_user, get_user_by_asap_token
from .db.games import insert_game, get_game
from .db.user_in_game import insert_user_in_game, get_dashboard, num_users_in_game, Status
from . import utils
from . import facebook as fb

# def index(request):
#     res = {'page': 'This is the index'}
#     return HttpResponse(json.dumps(res), content_type="application/json")
#
#
# def endpoint_example(request):
#     if 'team1' not in request.GET or 'team2' not in request.GET:
#         return HttpResponseBadRequest('Bad request')
#
#     res = {
#         'team1': request.GET['team1'],
#         'team2': request.GET.getlist('team2')
#     }
#     return HttpResponse(json.dumps(res), content_type="application/json")
#
#
# def params(request, number, slug):
#     res = {'number': number, 'slug': slug}
#     return HttpResponse(json.dumps(res), content_type="application/json")
#
#
# def params_regex(request, regex_var):
#     res = {'data_you_sent': regex_var}
#     return HttpResponse(json.dumps(res), content_type="application/json")


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
            first, last, profile_pic_url = fb.get_user_info(fb_access_token)
        except fb.FacebookAPIException as e:
            return utils.json_client_error("Failed to reach Facebook. %s" % str(e))

        conn = utils.get_connection()
        asap_access_token = uuid.uuid4()
        insert_user(conn, first, last, fb_access_token,
                    profile_pic_url, asap_access_token)
        res = get_user_by_asap_token(conn, asap_access_token).to_dict()
        conn.commit()

        res.update({'asap_access_token': str(asap_access_token)})
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
    conn = utils.get_connection()
    user = get_user_by_asap_token(conn, utils.sanitize_uuid(request.META['Authorization']))
    if user is None:
        return utils.json_client_error("Bad authorization")

    conn = utils.get_connection()
    games_upcoming, games_in_progress, past_games = get_dashboard(conn, user.id)
    conn.close()

    res = {'auth_user': user.to_dict(),
           'games_in_progress': [x.to_dict() for x in games_in_progress],
           'games_upcoming': [x.to_dict() for x in games_upcoming],
           'past_games': [x.to_dict() for x in past_games]}
    return utils.json_response(res)


def search(request):
    """
    :param request: {
          'radius_km': int,
          'start_time': dd-mmm-yyyy hh:mm,
          'end_time': dd-mmm-yyyy hh:mm,
          'sport': enum
        }
    :return: [game]
    """
    res = []
    return utils.json_response([x.to_dict() for x in res])


def join(request, game_id):
    """
    :param request: ASAP access token header
    :param game_id: int, in URL
    :return:
    """
    conn = utils.get_connection()
    user = get_user_by_asap_token(conn, utils.sanitize_uuid(request.META['Authorization']))
    if user is None:
        conn.close()
        return utils.json_client_error("Bad authorization")

    # TODO lock on game row???
    game = get_game(conn, game_id)
    num_players = num_users_in_game(conn, game_id)
    if num_players == game.max_players:
        conn.close()
        return utils.json_client_error("The game is already full.")

    insert_user_in_game(conn, user.id, game_id, Status.accepted)
    conn.commit()
    conn.close()
    return utils.json_response({"status": "Successfully join game"})


def host(request):
    """
    :param request: has data like:
        { 
           'game_title': str,
           'game_description': str,
           'max_players': int,
           'sport': sport_type_enum,
           'start_time': str('YYYY-MM-DD HH:MM'),
           'end_time': str('YYYY-MM-DD HH:MM'),
           'location_lng': float,
           'location_lat': float,
           'location_name': str
        }
    :return: {'game_id': game_id}
    """
    data = request.read()
    postdata = json.loads(data)
    try:
        game_title = postdata['title']
        game_description = postdata.get('desc')
        max_players = utils.sanitize_int(postdata['max_players'])
        sport = utils.sanitize_sport(postdata['sport'])
        start_time = utils.sanitize_datetime(postdata['start_time'])
        end_time = start_time + datetime.timedelta(hours=2) # TODO utils.sanitize_datetime(postdata['end_time'])
        location_lng = 0 #utils.sanitize_float(postdata['location_lng'])
        location_lat = 0 #utils.sanitize_float(postdata['location_lat'])
        location_name = postdata['location_name']
        asap_access_token = request.META['HTTP_AUTHORIZATION']
    except KeyError as e:
        return utils.json_client_error("Missing parameter " + str(e))

    # if start_time < datetime.datetime.utcnow() - datetime.timedelta(minutes=15):
    #     return utils.json_client_error("Bad start_time")

    l = locals()
    for x in ['max_players', 'sport', 'start_time', 'end_time', 'location_lng',
              'location_lat', 'location_name', 'asap_access_token']:
        if l[x] is None:
            return utils.json_client_error("Missing or invalid parameter %s with bad value of %s" % (x, postdata[x]))

    conn = utils.get_connection()
    user = get_user_by_asap_token(conn, asap_access_token)
    if user is None:
        return utils.json_client_error("Invalid access token.")

    game_id = insert_game(conn, user.id, game_title, game_description, max_players,
                            sport, start_time, end_time, location_lat, location_lng,
                            location_name)
    insert_user_in_game(conn, user.id, game_id, Status.accepted)

    conn.commit()
    conn.close()
    res = {'game_id': game_id}
    return utils.json_response(res)


def view(request, game_id):
    """
    :param request: ASAP access token header
    :param game_id: int, in URL
    :return: {
                'game_id': game_id,
               'host_id': user_id,
               'game_title': str,
               'game_description': str,
               'max_players': int,
               'sport': sport_type_enum,
               'start_time': str('YYYY-MM-DD HH:MM'),
               'end_time': str('YYYY-MM-DD HH:MM'),
               'location_lng': float,
               'location_lat': float,
               'location_name': str
             }
    """
    conn = utils.get_connection()
    game = get_game(conn, game_id)
    conn.close()
    return utils.json_response(game.to_dict())


##### NOTIFICATIONS #####

def subscribe2game(request, game_id):
    """
    :param request:
    :param game_id:
    :return:
    """
    res = {'status': 'success'}
    return utils.json_response(res)


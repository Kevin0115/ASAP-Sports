from .asapobject import ASAPObject
from asapsports.db.users import User

from itertools import chain
from datetime import datetime

class Game(ASAPObject):
    def __init__(self, id, host_id, title, description, max_players, sport, start_time,
                 end_time, location_lat, location_lng, location_name, comp_level,
                 creation_timestamp):
        self.id = id
        self.host_id = host_id
        self.title = title
        self.description = description
        self.max_players = max_players
        self.sport = sport
        self.start_time = start_time
        self.end_time = end_time
        self.location_lat = location_lat
        self.location_lng = location_lng
        self.location_name = location_name
        self.comp_level = comp_level
        self.creation_timestamp = creation_timestamp


def insert_game(conn, host_id, title, description, max_players, sport, start_time,
                 end_time, location_lat, location_lng, location_name, comp_level):
    query = """
        insert into games (id, host_id, title, description, max_players, sport, 
            start_time, end_time, location_lng, location_lat, location_name, comp_level)
            values (nextval('game_sequence'), %(host_id)s, %(title)s, %(description)s, %(max_players)s,
              %(sport)s, %(start_time)s, %(end_time)s, %(location_lng)s, %(location_lat)s, %(location_name)s,
              %(comp_level)s)
            returning id
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())
        for row in curs:
            return row[0]


def delete_game(conn, game_id):
    query = """
        DELETE FROM games WHERE id=%(game_id)s
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())


def get_game(conn, game_id):
    query = """
        select id, host_id, title, description, max_players, sport, start_time, 
            end_time, location_lat, location_lng, location_name, comp_level, 
            creation_timestamp
            from games where id=%(game_id)s
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())
        for row in curs:
            return Game(*row)


def get_users_in_game(conn, game_id):
    with conn.cursor() as curs:
        query = """
            select u.id, u.fb_id, u.first, u.last, u.age, u.gender, u.bio, u.fb_access_token, u.profile_pic_url,
                u.asap_access_token, u.show_age, u.show_bio, u.show_gender, u.creation_timestamp
                from user_in_games uig
                left outer join games g on uig.game_id = g.id
                left outer join users u on uig.user_id = u.id
                where uig.game_id=%s
        """
        curs.execute(query, [game_id])
        return [User(*row) for row in curs]


def search_games(conn, lng, lat, radius_m, start_time, sport, page_num):
    offset = page_num * 25
    query = """
        SELECT id, host_id, title, description, max_players, sport, start_time,
            end_time, location_lat, location_lng, location_name, comp_level, 
            creation_timestamp
            FROM games WHERE
                (start_time >= %(start_time)s - INTERVAL '24 hour') AND (start_time <= %(start_time)s + INTERVAL '24 hour')
                AND (%(sport)s='any' OR sport=%(sport)s)
                AND distance(%(lat)s, %(lng)s, location_lat, location_lng) <= %(radius_m)s
            ORDER BY start_time ASC
            OFFSET %(offset)s
            LIMIT 25
    """

    with conn.cursor() as curs:
        curs.execute(query, locals())
        games = [Game(*row) for row in curs]

    for g in games:
        g.players = get_users_in_game(conn, g.id)
    return games


def get_dashboard(conn, user_id):
    # TODO this breaks if a user is in 25 games in the future
    query = """
            SELECT id, host_id, title, description, max_players, sport, start_time,
                end_time, location_lat, location_lng, location_name, comp_level, g.creation_timestamp
            FROM user_in_games AS uig
            LEFT OUTER JOIN games AS g ON uig.game_id=g.id
            WHERE uig.user_id=%(user_id)s
            ORDER BY g.start_time ASC
            LIMIT 25
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())
        games = [Game(*row) for row in curs]
        now = datetime.utcnow()
        games_upcoming = [g for g in games if g.start_time > now]
        games_in_progress = [g for g in games if g.start_time <= now <= g.end_time]
        past_games = [g for g in games if g.end_time < now]

    for g in chain(past_games, games_in_progress, games_upcoming):
        g.players = get_users_in_game(conn, g.id)

    return games_upcoming, games_in_progress, past_games

from .asapobject import ASAPObject
from asapsports.utils import distance_between, offset_lat_lng


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
                 end_time, location_lng, location_lat, location_name, comp_level):
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


def search_games(conn, lng, lat, radius_m, start_time, sport, page_num):
    offset = page_num * 25
    query = """
        select id, host_id, title, description, max_players, sport, start_time, 
            end_time, location_lat, location_lng, location_name, comp_level, 
            creation_timestamp
            from games where start_time >= %(start_time)s and start_time <= %(start_time)s + interval '4 hour'
                and (%(sport)s='any' or sport=%(sport)s) 
                --and distance(%(lat)s, %(lng)s, location_lat, location_lng) <= %(radius_m)s TODO uncomment and make work
                offset %(offset)s
                limit 25
    """

    with conn.cursor() as curs:
        curs.execute(query, locals())
        games = [Game(*row) for row in curs]
        # TODO filter in database so we can get a defined amount from DB. Very importante.
        games = [g for g in games if distance_between(g.location_lat, g.location_lng, lat, lng) <= radius_m]
        return games

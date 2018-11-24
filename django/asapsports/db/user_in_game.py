import datetime

from .games import Game


class Status:
    invited = 'invited'
    accepted = 'accepted'
    declined = 'declined'


def insert_user_in_game(conn, user_id, game_id, status):
    query = """ insert into user_in_games (user_id, game_id, status)
                  values (%(user_id)s, %(game_id)s, %(status)s)  """
    with conn.cursor() as curs:
        curs.execute(query, locals())


def num_users_in_game(conn, game_id): # TODO throw error if no game with game ID exists (count == 0)
    query = """
        select count(*) from user_in_games where game_id=%(game_id)s
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())
        for row in curs:
            return row[0]

def get_users(conn, game_id):
    users = []
    query = """
        select user_id from user_in_games where game_id=%(game_id)s
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())
        for row in curs:
            users.append(row[0])
    return users


def get_dashboard(conn, user_id):
    # TODO this breaks if a user is in 25 games in the future
    query = """
            SELECT id, host_id, title, description, max_players, sport, start_time,
                end_time, location_lat, location_lng, location_name, comp_level, g.creation_timestamp
            FROM user_in_games AS uig
            LEFT OUTER JOIN games AS g ON uig.game_id=g.id
            WHERE uig.user_id=%(user_id)s
            ORDER BY g.creation_timestamp DESC 
            LIMIT 25
    """
    with conn.cursor() as curs:
        mog = ''.join([chr(x) for x in curs.mogrify(query, locals())]).split('\n')
        for line in mog:
            print(line)
        curs.execute(query, locals())
        games = [Game(*row) for row in curs]
        now = datetime.datetime.utcnow()
        games_upcoming = [g for g in games if g.start_time > now]
        games_in_progress = [g for g in games if g.start_time <= now <= g.end_time]
        past_games = [g for g in games if g.end_time < now]
        return games_upcoming, games_in_progress, past_games

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


def get_dashboard(conn, user_id):
    # TODO this breaks if a user is in 25 games in the future
    query = """
            SELECT id, host_id, title, description, max_players, sport, start_time,
                 end_time, location_lat, location_lng, location_name, creation_timestamp
            FROM games g LEFT OUTER JOIN user_in_games uig ON uig.game_id=g.id
            WHERE uid.user_id=%(user_id)s ORDER BY g.creation_timestamp DESC LIMIT 25
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())
        games = [Game(*row) for row in curs]
        now = datetime.datetime.utcnow()
        games_upcoming = [g for g in games if g.start_time > now]
        games_in_progress = [g for g in games if g.start_time <= now <= g.end_time]
        past_games = [g for g in games if g.end_time < now]
        return games_upcoming, games_in_progress, past_games
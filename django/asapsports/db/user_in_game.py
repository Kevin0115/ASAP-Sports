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

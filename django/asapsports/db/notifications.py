from datetime import datetime

def insert_notification(conn, start_time, game_id):
    query = """ insert into notifications (start_time, game_id)
                  values (%(start_time)s, %(game_id)s  """
    with conn.cursor() as curs:
        curs.execute(query, locals())

def get_current_notification(conn, cur_time):
    query = """ select * from notifications"""
    games = []
    with conn.cursor() as curs:
        curs.execute(query, [id])
        for row in curs:
            notification_time = datetime.strptime(str(row[1]), '%A, %B %d, %Y %I:%M %p').timestamp()
            if notification_time-cur_time < 3600:
                games.append(row[2])
    return games

def delete_notification(conn, game_id):
    query = """ delete from table where game_id=%(game_id)s"""
    with conn.cursor() as curs:
        curs.execute(query, locals())
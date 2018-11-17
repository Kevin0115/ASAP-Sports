from asapsports.settings import *
try:
    from asapsports.local_settings import *
except ImportError:
    pass
DB_INFO = DATABASES['default']

import psycopg2


def get_connection(): # TODO change to connect to test DB instead
    return psycopg2.connect(dbname=DB_INFO['NAME'],
                            user=DB_INFO.get('USER'),
                            password=DB_INFO.get('PASSWORD'),
                            host=DB_INFO.get('HOST'),
                            port=DB_INFO.get('PORT'))



def insert_user(conn, fb_id, first, last, fb_access_token,
                 profile_pic_url, asap_access_token):
    query = """
        insert into users (fb_id, first, last, fb_access_token, 
        profile_pic_url, asap_access_token)
          values (%(fb_id)s, %(first)s, %(last)s, %(fb_access_token)s, 
          %(profile_pic_url)s, %(asap_access_token)s)
    """
    with conn.cursor() as curs:
        print(locals())
        curs.execute(query, locals())

def delete_user(conn, asap_access_token):

    cur = conn.cursor()
    # execute the UPDATE  statement
    cur.execute("DELETE FROM users WHERE asap_access_token = %s", (asap_access_token,))
    # get the number of updated rows
    rows_deleted = cur.rowcount
    print("{} rows deleted".format(rows_deleted))
    # Commit the changes to the database
    conn.commit()
    # Close communication with the PostgreSQL database
    cur.close()

def delete_games(conn):

    cur = conn.cursor()
    # execute the UPDATE  statement
    cur.execute("DELETE FROM games WHERE id > 0 ")
    # get the number of updated rows
    rows_deleted = cur.rowcount
    print("{} rows deleted".format(rows_deleted))
    # Commit the changes to the database
    conn.commit()
    # Close communication with the PostgreSQL database
    cur.close()

def delete_user_in_games(conn):

    cur = conn.cursor()
    # execute the UPDATE  statement
    cur.execute("DELETE FROM user_in_games WHERE game_id > 0 ")
    # get the number of updated rows
    rows_deleted = cur.rowcount
    print("{} rows deleted".format(rows_deleted))
    # Commit the changes to the database
    conn.commit()
    # Close communication with the PostgreSQL database
    cur.close()

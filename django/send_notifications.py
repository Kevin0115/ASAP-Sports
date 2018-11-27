
from asapsports.db.users import insert_user, get_user_by_asap_token, get_user_by_fb_id, get_user_by_id
from asapsports.db.notifications import get_current_notification, delete_notification
from asapsports.db.user_in_game import get_users
from asapsports.db.games import get_game
#from utils import get_connection
from datetime import datetime
import requests
import psycopg2
import time

from asapsports.settings import *
try:
    from asapsports.local_settings import * # Override with local settings if there are any
except ImportError:
    print("Import Error")

#print(locals())

DB_INFO = DATABASES['default']

def get_connection():
    # Copy the other code for get connection...
    return psycopg2.connect(dbname=DB_INFO['NAME'],
                            user=DB_INFO.get('USER'),
                            password=DB_INFO.get('PASSWORD'),
                            host=DB_INFO.get('HOST'),
                            port=DB_INFO.get('PORT'))

notifications = []
conn = get_connection()

while 1:
    #potentially could add this sleep so that its not running a db query too often
    #time.sleep(20)
    cur_time = datetime.utcnow().timestamp()
    notifications = get_current_notification(conn, cur_time)
    for game_id in notifications:
        delete_notification(conn, game_id)
        conn.commit()
        game = get_game(conn, game_id)
        message = "You have a " + game.sport + " game in 1 hour"
        user_ids = get_users(conn, game_id)
        for user_id in user_ids:
            user = get_user_by_id(conn, user_id)
            token = user.push_token
            params={
                "to": token,
                "sound": "default",
                "body": message
            }
            r = requests.post("https://exp.host/--/api/v2/push/send", data=params)
        


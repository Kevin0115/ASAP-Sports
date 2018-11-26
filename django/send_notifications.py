
from asapsports.db.users import insert_user, get_user_by_asap_token, get_user_by_fb_id, get_user_by_id, update_user_by_id
from asapsports.db.notifications import get_current_notification, delete_notification
#from utils import get_connection
from datetime import datetime
import requests
import psycopg2

from asapsports.settings import *
try:
    from asapsports.local_settings import * # Override with local settings if there are any
except ImportError:
    print("Import Error")

print(locals())

DB_INFO = DATABASES['default']

def get_connection():
    # Copy the other code for get connection...
    return psycopg2.connect(dbname=DB_INFO['NAME'],
                            user=DB_INFO.get('USER'),
                            password=DB_INFO.get('PASSWORD'),
                            host=DB_INFO.get('HOST'),
                            port=DB_INFO.get('PORT'))

"""
from datetime import datetime
print("hi")
datetime_object = datetime.strptime('Sunday, December 01, 2019 12:00 PM', '%A, %B %d, %Y %I:%M %p')
curtime = datetime.now()
print(datetime_object.timestamp())
print(curtime)
print(curtime.timestamp())
"""

#r = requests.post("https://exp.host/--/api/v2/push/send", data={'to': 'ExponentPushToken[ApS2k4O61aNJiiarjotwjw]', 'sound': 'default', 'body': 'hi'})

notifications = []
conn = get_connection()
user = get_user_by_id(conn,1).to_json()
print(user['first'])



"""
while 1:
    """
cur_time = datetime.now().timestamp()
notifications = get_current_notification(conn, cur_time)
for game_id in notifications:
    users = 
    print(game_id)
    r = requests.post("https://exp.host/--/api/v2/push/send", data={'to': 'ExponentPushToken[ApS2k4O61aNJiiarjotwjw]', 'sound': 'default', 'body': 'hi'})
    #TODO put expo post request here
    #delete_notification(conn, game_id)


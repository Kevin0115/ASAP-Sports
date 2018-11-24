
from .db.notifications import get_current_notification, delete_notification
from . import utils
from datetime import datetime

"""
from datetime import datetime
print("hi")
datetime_object = datetime.strptime('Sunday, December 01, 2019 12:00 PM', '%A, %B %d, %Y %I:%M %p')
curtime = datetime.now()
print(datetime_object.timestamp())
print(curtime)
print(curtime.timestamp())
"""
notifications = []
conn = utils.get_connection()
while 1:
    cur_time = datetime.now().timestamp()
    notifications = get_current_notification(conn, cur_time)
    for game_id in notifications:
        print(game_id)
        #TODO put expo post request here
        delete_notification(conn, game_id)

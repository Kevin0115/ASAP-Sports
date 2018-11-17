import sys
sys.path.insert(0, '../') 
from test.utils import get_connection, delete_user, delete_games, delete_user_in_games



conn = get_connection()

delete_user_in_games(conn)
delete_games(conn)
delete_user(conn, "00000000-0000-0000-0000-000000000000")
# close communication with the database
conn.close()

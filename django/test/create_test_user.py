import sys
sys.path.insert(0, '../') 
from test.utils import get_connection, insert_user



conn = get_connection()
insert_user(conn, 1, 'test', 'test', None,
                    None, "00000000-0000-0000-0000-000000000000")
conn.commit()
# close communication with the database
conn.close()

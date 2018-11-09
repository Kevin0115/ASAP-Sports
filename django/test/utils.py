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

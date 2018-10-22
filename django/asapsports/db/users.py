from .asapobject import ASAPObject


class User(ASAPObject):
    def __init__(self, id, fb_id, first, last, fb_access_token,
                 profile_pic_url, asap_access_token, creation_timestamp):
        self.id = id
        self.fb_id = fb_id
        self.first = first
        self.last = last
        self.fb_access_token = fb_access_token
        self.profile_pic_url =profile_pic_url
        self.asap_access_token = asap_access_token
        self.creation_timestamp = creation_timestamp


def get_user_by_asap_token(conn, asap_access_token):
    query = """
        select id, fb_id, first, last, fb_access_token, profile_pic_url,
            asap_access_token, creation_timestamp
            from users where asap_access_token=%s
    """
    with conn.cursor() as curs:
        curs.execute(query, [asap_access_token])
        for row in curs:
            return User(*row)


def get_user_by_fb_id(conn, fb_id):
    query = """
        select id, fb_id, first, last, fb_access_token, profile_pic_url,
            asap_access_token, creation_timestamp
            from users where fb_id=%s
    """
    with conn.cursor() as curs:
        curs.execute(query, [fb_id])
        for row in curs:
            return User(*row)


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


def update_user(conn):
    query = """

    """
    raise ValueError("Not implemented")



from .asapobject import ASAPObject


class User(ASAPObject):
    def __init__(self, id, fb_id, first, last, age, gender, bio, fb_access_token,
                 profile_pic_url, asap_access_token, show_age, show_bio, show_gender, push_token,
                 creation_timestamp):
        self.id = id
        self.fb_id = fb_id
        self.first = first
        self.last = last
        self.age = age
        self.gender = gender
        self.bio = bio
        self.fb_access_token = fb_access_token
        self.profile_pic_url =profile_pic_url
        self.asap_access_token = asap_access_token
        self.show_age = show_age
        self.show_bio = show_bio
        self.show_gender = show_gender
        self.push_token = push_token
        self.creation_timestamp = creation_timestamp
        # TODO: small security flaw to send bio/gender/age if show_bio/gender/age is false


def get_user_by_asap_token(conn, asap_access_token):
    query = """
        select id, fb_id, first, last, age, gender, bio, fb_access_token, profile_pic_url,
            asap_access_token, show_age, show_bio, show_gender, push_token, creation_timestamp
            from users where asap_access_token=%s
    """
    with conn.cursor() as curs:
        curs.execute(query, [asap_access_token])
        for row in curs:
            return User(*row)


def get_user_by_fb_id(conn, fb_id):
    query = """
        select id, fb_id, first, last, age, gender, bio, fb_access_token, profile_pic_url,
            asap_access_token, show_age, show_bio, show_gender, push_token, creation_timestamp
            from users where fb_id=%s
    """
    with conn.cursor() as curs:
        curs.execute(query, [fb_id])
        for row in curs:
            return User(*row)


def get_user_by_id(conn, id):
    query = """
        select id, fb_id, first, last, age, gender, bio, fb_access_token, profile_pic_url,
            asap_access_token, show_age, show_bio, show_gender, push_token, creation_timestamp
            from users where id=%s
    """
    with conn.cursor() as curs:
        curs.execute(query, [id])
        for row in curs:
            return User(*row)


def insert_user(conn, fb_id, first, last, age, gender, bio, fb_access_token,
                 profile_pic_url, asap_access_token, push_token):
    query = """
        insert into users (fb_id, first, last, age, gender, bio, fb_access_token, 
        profile_pic_url, asap_access_token, push_token)
          values (%(fb_id)s, %(first)s, %(last)s, %(age)s, %(gender)s, %(bio)s,  %(fb_access_token)s, 
          %(profile_pic_url)s, %(asap_access_token)s, %(push_token)s)
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())


def update_user_profile_by_id(conn, id, first, last, profile_pic_url,
                    age, gender, bio, show_age, show_gender, show_bio):
    query = """
        update users set 
        first=coalesce(%(first)s, first),
        last=coalesce(%(last)s, last),
        profile_pic_url=coalesce(%(profile_pic_url)s, profile_pic_url),
        age=coalesce(%(age)s, age),
        gender=coalesce(%(gender)s, gender),
        bio=coalesce(%(bio)s, bio),
        show_age=coalesce(%(show_age)s, show_age),
        show_gender=coalesce(%(show_gender)s, show_gender),
        show_bio=coalesce(%(show_bio)s, show_bio)
        where id=%(id)s
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())

def insert_push_token(conn, id, push_token):
    query = """
        update users set 
        push_token=%(push_token)s
        where id=%(id)s
    """
    with conn.cursor() as curs:
        curs.execute(query, locals())



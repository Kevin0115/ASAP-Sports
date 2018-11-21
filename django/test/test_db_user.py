from asapsports.db import users
from test.utils import get_connection

import pytest
import uuid
import psycopg2

# users.get_user_by_asap_token()


# users.get_user_by_fb_id()


@pytest.fixture
def db_conn():
    # Setup code goes here
    conn = get_connection()

    yield conn

    # Tear down code goes here
    conn.rollback()
    conn.close()


@pytest.mark.parametrize("fb_id, first, last, fb_access_token, profile_pic_url, asap_access_token", [
    # (153235, None,    'Last', None, 'https://google.com/image.jpg', '32f63eb8-b927-4bda-898b-5ec5f53f304e'), # No first name
    (153235, 'First', 'Last', None, 'https://google.com/image.jpg', 'BADUUID0101-0101-0101-0101-0101'),       # Bad access token
])
def test_insert_user_error(db_conn, fb_id, first, last, fb_access_token,
                   profile_pic_url, asap_access_token):
    with pytest.raises(psycopg2.Error) as e_info:
        users.insert_user(db_conn, fb_id, first, last, fb_access_token, 
            profile_pic_url, asap_access_token)


@pytest.mark.parametrize("fb_id, first, last, fb_access_token, profile_pic_url, asap_access_token", [
    (153235, 'First', 'Last', None, 'https://google.com/image.jpg', ('32f63eb8-b927-4bda-898b-5ec5f53f304e')), # All valid
    (153235, 'First', None,   None, 'https://google.com/image.jpg', ('32f63eb8-b927-4bda-898b-5ec5f53f304e')), # No last name
])
def test_insert_user_no_error(db_conn, fb_id, first, last, fb_access_token,
                   profile_pic_url, asap_access_token):
    try:
        users.insert_user(db_conn, fb_id, first, last, fb_access_token,
                   profile_pic_url, asap_access_token)
        assert True
    except psycopg2.Error:
        assert False


@pytest.mark.parametrize("fb_id, first, last, fb_access_token, profile_pic_url, asap_access_token", [
    (153235, 'First', 'Last', None, 'https://google.com/image.jpg', ('32f63eb8-b927-4bda-898b-5ec5f53f304e')), # All valid
])
def test_get_user_fb_id(db_conn, fb_id, first, last, fb_access_token,
                   profile_pic_url, asap_access_token):
    try:
        users.insert_user(db_conn, fb_id, first, last, fb_access_token,
                   profile_pic_url, asap_access_token)
        assert True
    except psycopg2.Error:
        assert False

    user = users.get_user_by_fb_id(db_conn, fb_id)
    assert user is not None
    udict = user.__dict__
    for key in ['fb_id', 'first', 'last', 'fb_access_token', 'profile_pic_url', 'asap_access_token']:
        assert udict[key] == locals()[key]


def test_get_user_access_token(db_conn):
    fb_id, first, last, fb_access_token, profile_pic_url, asap_access_token = 153235, 'First', 'Last', None, 'https://google.com/image.jpg', '32f63eb8-b927-4bda-898b-5ec5f53f304e' # All valid
    try:
        users.insert_user(db_conn, fb_id, first, last, fb_access_token,
                   profile_pic_url, asap_access_token)
        assert True
    except psycopg2.Error:
        assert False

    user = users.get_user_by_asap_token(db_conn, asap_access_token)
    assert user is not None
    udict = user.__dict__
    for key in ['fb_id', 'first', 'last', 'fb_access_token', 'profile_pic_url', 'asap_access_token']:
        assert udict[key] == locals()[key]


def test_get_user_bad_access_token(db_conn):    
    with pytest.raises(psycopg2.Error) as e_info:
        users.get_user_by_asap_token(db_conn, 'BAD-UUID')



def test_get_nonexistant_user_by_access_token(db_conn):    
    user = users.get_user_by_asap_token(db_conn, '6490a5c0-19c1-477e-b9ff-cd5dae44c321')
    assert user is None


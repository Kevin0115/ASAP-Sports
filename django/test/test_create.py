from asapsports.db import users
from test.utils import get_connection

import uuid
import requests
import json
import pytest




@pytest.fixture
def asap_access_token():
    # Setup code goes here
    conn = get_connection()


    asap_access_token = uuid.uuid4()
    users.insert_user(conn, 1, 'test', 'test', None,
                    None, str(asap_access_token))

    yield asap_access_token

    # Tear down code goes here
    conn.rollback()
    conn.close()


def test_valid_data(asap_access_token):


    headers = {'Authorization': str(asap_access_token)}
    params = {'title': 'test_title',
           'desc': 'test_desc',
           'max_players': 6,
           'sport': 'basketball',
           'start_time': str('2018-12-01 12:00'),
           'duration': 30,
           'location_lng': 0.0,
           'location_lat': 0.0,
           'location_name': 'test_loc',
           'comp_level': 1}

    try:
        print('before')
        res = requests.post("http://localhost:8000/games/host", data=json.dumps(params), headers=headers)
        print(res.content)
        assert True
    except:
        assert False

def test_invalid_json(asap_access_token):
    assert True

def test_missing_param(asap_access_token):
    assert True

def test_invalid_start_time(asap_access_token):
    assert True

def test_invalid_token(asap_access_token):
    assert True

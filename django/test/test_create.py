from asapsports.db import users
from test.utils import get_connection
from . import utils

import uuid
import requests
import json
import pytest




@pytest.fixture
def asap_access_token():
    # Setup code goes here
    conn = utils.get_connection()

    asap_access_token = "00000000-0000-0000-0000-000000000000"
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
           'start_time': str('2019-12-01 12:00'),
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

def test_missing_json(asap_access_token):
    headers = {'Authorization': str(asap_access_token)}
    params = {}

    try:
        print('before')
        res = requests.post("http://localhost:8000/games/host", data=json.dumps(params), headers=headers)
        print(res.content)
        if "Missing" not in res.text: 
            assert False
        else:
            assert True
    except:
        assert False

def test_missing_param(asap_access_token):
    headers = {'Authorization': str(asap_access_token)}
    params = {'title': 'test_title',
           'desc': 'test_desc',
           'max_players': 6,
           'start_time': str('2019-12-01 12:00'),
           'duration': 30,
           'location_lng': 0.0,
           'location_lat': 0.0,
           'location_name': 'test_loc',
           'comp_level': 1}

    try:
        print('before')
        res = requests.post("http://localhost:8000/games/host", data=json.dumps(params), headers=headers)
        print(res.content)
        if "Missing parameter" not in res.text: 
            assert False
        else:
            assert True
    except:
        assert False

def test_invalid_start_time(asap_access_token):
    headers = {'Authorization': str(asap_access_token)}
    params = {'title': 'test_title',
           'desc': 'test_desc',
           'max_players': 6,
           'sport': 'basketball',
           'start_time': str('2017-12-01 12:00'),
           'duration': 30,
           'location_lng': 0.0,
           'location_lat': 0.0,
           'location_name': 'test_loc',
           'comp_level': 1}

    try:
        print('before')
        res = requests.post("http://localhost:8000/games/host", data=json.dumps(params), headers=headers)
        print(res.content)
        if "Bad start_time" not in res.text: 
            assert False
        else:
            assert True
    except:
        assert False

def test_invalid_token():
    headers = {'Authorization': "fail"}
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
        if "Server Error" not in res.text: 
            assert False
        else:
            assert True
    except:
        assert False

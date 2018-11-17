from . import utils, data
import requests
import json
import pytest

def test_valid_data():


    headers = {'Authorization': data.user["asap_access_token"]}
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
        res = requests.post("http://localhost:8000/games/host", data=json.dumps(params), headers=headers)
        print(res.text)
        assert "game_id" in res.text
    except:
        assert False

def test_missing_json():
    headers = {'Authorization': data.user["asap_access_token"]}
    params = {}

    try:
        res = requests.post("http://localhost:8000/games/host", data=json.dumps(params), headers=headers)
        print(res.text)
        assert "error" in res.text
        assert "Missing" in res.text
    except:
        assert False

def test_missing_param():
    headers = {'Authorization': data.user["asap_access_token"]}
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
        res = requests.post("http://localhost:8000/games/host", data=json.dumps(params), headers=headers)
        print(res.text)
        assert "error" in res.text
        assert "Missing parameter" in res.text
    except:
        assert False

def test_invalid_start_time():
    headers = {'Authorization': data.user["asap_access_token"]}
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
        res = requests.post("http://localhost:8000/games/host", data=json.dumps(params), headers=headers)
        print(res.text)
        assert "error" in res.text
        assert "Bad start_time" in res.text
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
        res = requests.post("http://localhost:8000/games/host", data=json.dumps(params), headers=headers)
        print(res.text)
        assert "Server Error" in res.text
        assert "500" in res.text
    except:
        assert False

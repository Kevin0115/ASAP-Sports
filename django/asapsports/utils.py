import json
import uuid
import math
import datetime
import psycopg2
from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest

DB_INFO = settings.DATABASES['default']

sports = [
    'basketball', 'volleyball', 'soccer', 'baseball', 'badminton', 'football',
    'table_tennis', 'tennis', 'bouldering', 'skateboarding', 'boxing',
    'wrestling', 'swimming', 'ultimate_frisbee'
]


def get_connection():
    return psycopg2.connect(dbname=DB_INFO['NAME'],
                            user=DB_INFO.get('USER'),
                            password=DB_INFO.get('PASSWORD'),
                            host=DB_INFO.get('HOST'),
                            port=DB_INFO.get('PORT'))


def sanitize_bool(x):
    if x in ('True', 'true', 't', 'T', True, 'on'):
        return True
    if x in ('False', 'false', 'f', 'F', False, 'off'):
        return False
    return None


def sanitize_text(x):
    return x.strip() if isinstance(x, str) else None


def sanitize_int(x):
    try:
        return int(x)
    except (ValueError, TypeError):
        return None


def sanitize_float(x):
    try:
        return float(x)
    except ValueError:
        return None


def sanitize_uuid(x):
    try:
        return uuid.UUID(x)
    except ValueError:
        return None


def sanitize_datetime(x):
    for fmt in ['%Y-%m-%d %H:%M', '%A, %B %d, %Y %I:%M %p', '%a, %d %b %Y %H:%M:%S %Z']:
        try:
            return datetime.datetime.strptime(x, fmt)
        except ValueError:
            pass
    return None


def sanitize_sport(x):
    x = x.lower()
    return x if x in sports else None


def json_response(dict_obj):
    return HttpResponse(json.dumps(dict_obj), content_type="application/json")


def json_client_error(error_str):
    return HttpResponseBadRequest(json.dumps({'error': error_str}), content_type="application/json")


def distance_between(lat1, lng1, lat2, lng2):
    """
    Returns the distance in meters between (lat1, lng1) and (lat2, lng2)
    """
    # approximate radius of earth in m
    R = 6373000.0

    lat1 = math.radians(lat1)
    lng1 = math.radians(lng1)
    lat2 = math.radians(lat2)
    lng2 = math.radians(lng2)

    dlng = lng2 - lng1
    dlat = lat2 - lat1

    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlng / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return int(R * c)


def offset_lat_lng(lat, lng, meters_offset):
    """
    Returns the latitidinal distance (offset_lat) and longitudinal distance (offset_lng) 
    that will, when added to (lat, lng) create a square that contains all points within meters_offset
    of (lat, lng)

    Used to get an estimate of how much latitude, longitude to query the DB
    :return: offset_lat, offset_lng 
    """
    magic = 111111 # Magic number in meters to estimate lng (approximately 1/90 of distance from equator to North Pole)
    offset_lat = meters_offset / magic
    offset_lng = meters_offset / (magic * math.cos(math.radians(lat)))
    return offset_lat, offset_lng
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


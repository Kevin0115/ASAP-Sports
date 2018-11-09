from asapsports.db import users
from test.utils import get_connection

import pytest

# users.get_user_by_asap_token()


# users.get_user_by_fb_id()


# users.insert_user()

@pytest.fixture
def db_conn():
    # Setup code goes here
    conn = get_connection()

    yield conn

    # Tear down code goes here
    conn.rollback()
    conn.close()


@pytest.mark.parametrize("x,y,s", [
    (30, 10, 40),
    (-1, 1, 0),
    (10, 1, 11),
])
def test_add(db_conn, x, y, s):
    assert x + y == s


def test_fail(db_conn):
    assert False

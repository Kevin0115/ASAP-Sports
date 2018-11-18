#!/usr/bin/python
# coding: utf-8
from flask import Flask, request
import requests
import psycopg2
import subprocess


app = Flask(__name__)
SECRET = 'gHjgTVTBbAihjdOCF2myElkY0NFsSLMbikobVDeyb3QFXiUNrl'
DJANGO_DIR = None

# TODO set app route
@app.route('/testrunner/pullrequest')
def entry_point():
    print(request)
    print(request.body)

    # Check if the event is what we want to run tests for
    if request.body['action'] not in ('opened', 'edited', 'reopened'):
        return 'OK'
    head_commit_sha = request.body['pull_request']['head']['sha']

    # Auth with Github (maybe make a new Github user) TODO


    # Set status to pending
    data = {
        'state': 'pending',
        'description': 'Testrunner is currently processing this pull request.',
        'context': 'testrunner CI'
    }
    res = requests.post(f'https://github.com/repos/aidoraide/ASAP-Sports/statuses/{head_commit_sha}', data=data)
    print('Set status to pending:')
    print(res.text)
    

    # Run tests with coverage and get the report as a UTF-8 string
    result = subprocess.run(['pytest', '--cov='+DJANGO_DIR, DJANGO_DIR+'test/'], stdout=subprocess.PIPE)
    coverage_report = result.stdout.decode('utf-8')
    status = 'failure' if 'FAILURE' in coverage_report and 'test_fail' in coverage_report else 'success'
    
    # Send status to the correct SHA https://developer.github.com/v3/repos/statuses/
    data = {
        'state': status,
        'description': coverage_report,
        'context': 'testrunner CI'
    }
    res = requests.post(f'https://github.com/repos/aidoraide/ASAP-Sports/statuses/{head_commit_sha}', data=data)
    print('Set status to %s:' % status)
    print(res.text)
    return 'OK'


if __name__ == '__main__':
    import sys
    try:
        from local_settings import *
    except ImportError:
        DEBUG = False

    if len(sys.argv) != 2:
        print("You must pass one argument, the directory of the tests to run. Ex:\npython testrunner.py /webapps/testasapsports/ASAP-Sports/django")
        exit(1)

    DJANGO_DIR = sys.argv[1]
    if DJANGO_DIR[-1] not in '/\\':
        DJANGO_DIR = DJANGO_DIR + '/'
    app.run(debug=DEBUG)

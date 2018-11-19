#!/usr/bin/python
# coding: utf-8
from flask import Flask, request
from github import Github
from base64 import b64encode
import requests
import psycopg2
import subprocess


app = Flask(__name__)
SECRET = 'gHjgTVTBbAihjdOCF2myElkY0NFsSLMbikobVDeyb3QFXiUNrl'
ACCESS_TOKEN = '2e94b2b3f2be9209cb7806d55bd7d7e7f1425788'
DJANGO_DIR = None

# TODO set app route
@app.route('/testrunner/pullrequest', methods=['POST'])
def entry_point():
    print(request)
    request_json = request.get_json()
    # print(request_json)

    # Check if the event is what we want to run tests for
    if request_json['action'] not in ('opened', 'edited', 'reopened'):
        return 'OK'
    head_commit_sha = request_json['pull_request']['head']['sha']
    status_url = f'https://api.github.com/repos/aidoraide/ASAP-Sports/statuses/{head_commit_sha}'
    headers = {'Authorization': b64encode(b'ASAPSports:2e94b2b3f2be9209cb7806d55bd7d7e7f1425788')} # Access token with only access to status API
    

    # Auth with Github (maybe make a new Github user) TODO
    g = Github('106ad45e42b40bda0840409d61564c809a7bc274')
    print(dir(g))


    # Set status to pending
    data = {
        'state': 'pending',
        'description': 'Testrunner is currently processing this pull request.',
        'context': 'testrunner CI'
    }
    print(requests.get('https://api.github.com/repos/aidoraide/ASAP-Sports/statuses/5d46818a9aa871d7795331bae8d84f6999e1be32').text)
    print(status_url)
    res = requests.post(status_url, data=data, headers=headers)
    jsonres = res.json()
    print('Set status to pending:')
    print(res.status_code)
    print(jsonres)
    

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
    res = requests.post(status_url, data=data, headers=headers).json()
    print('Set status to %s:' % status)
    print(res)
    # print(coverage_report)
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

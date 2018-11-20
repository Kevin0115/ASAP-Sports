#!/usr/bin/python
# coding: utf-8
from flask import Flask, request
from base64 import b64encode
import requests
import subprocess
import json
import uuid
import os


app = Flask(__name__)
SECRET = 'gHjgTVTBbAihjdOCF2myElkY0NFsSLMbikobVDeyb3QFXiUNrl' # TODO use
DJANGO_DIR = None


@app.route('/testrunner/pullrequest', methods=['POST'])
def entry_point():
    request_json = request.get_json()

    # Check if the event is what we want to run tests for
    if request_json['action'] not in ('opened', 'edited', 'reopened'):
        return 'OK'
    head_commit_sha = request_json['pull_request']['head']['sha']
    status_url = f'https://api.github.com/repos/aidoraide/ASAP-Sports/statuses/{head_commit_sha}'
    headers = {'Authorization': b'Basic ' + b64encode(b'ASAPSports:ff7bfa48c4bf998ff14f5fd5f9858eec09b67f3f')} # Access token with only access to status API


    coverage_report_filename = head_commit_sha + '.txt'
    report_url = f'http://testasapsports.aidanrosswood.ca/static/test_reports/{coverage_report_filename}'
    # Set status to pending
    data = {
        'state': 'pending',
        'target_url': report_url,
        'description': 'Testrunner is currently processing this pull request.',
        'context': 'testrunner CI'
    }
    requests.post(status_url, data=json.dumps(data), headers=headers)

    # Run tests with coverage and get the report as a UTF-8 string
    result = subprocess.run(['pytest', '--cov='+DJANGO_DIR, DJANGO_DIR+'test/'], stdout=subprocess.PIPE)
    coverage_report = result.stdout.decode('utf-8')
    status = 'failure' if 'FAILURE' in coverage_report and 'test_fail' in coverage_report else 'success'
    with open(os.path.join(DJANGO_DIR, f'static/test_reports/{coverage_report_filename}'), 'w') as f:
        f.write(coverage_report)
    
    # Send status to the correct SHA https://developer.github.com/v3/repos/statuses/
    data = {
        'state': status,
        'target_url': report_url,
        'description': f'Test {status}. Click details to view report ---->', # coverage_report,
        'context': 'testrunner CI'
    }
    requests.post(status_url, data=json.dumps(data), headers=headers)
    return 'OK'


if __name__ == '__main__':
    import sys
    try:
        from local_settings import *
    except ImportError:
        DEBUG = False

    if len(sys.argv) != 2:
        print("You must pass one argument, the directory of Django. Ex:\npython testrunner.py /webapps/testasapsports/ASAP-Sports/django")
        exit(1)

    DJANGO_DIR = sys.argv[1]
    if DJANGO_DIR[-1] not in '/\\':
        DJANGO_DIR = DJANGO_DIR + '/'
    app.run(debug=DEBUG)

from flask import Flask, request
from github import Github
from base64 import b64encode
import requests
import psycopg2
import subprocess

head_commit_sha = '5d46818a9aa871d7795331bae8d84f6999e1be32'
status_url = f'https://api.github.com/repos/aidoraide/ASAP-Sports/statuses/{head_commit_sha}'
headers = {'Authorization': b64encode(b'ASAPSports:2e94b2b3f2be9209cb7806d55bd7d7e7f1425788')} # Access token with only access to status API


# Set status to pending
data = {
    'state': 'pending',
    'description': 'Testrunner is currently processing this pull request.',
    'context': 'testrunner CI'
}
# print(requests.get('https://api.github.com/repos/aidoraide/ASAP-Sports/statuses/5d46818a9aa871d7795331bae8d84f6999e1be32').text)
# print(status_url)
res = requests.post(status_url, data=data, headers=headers)
jsonres = res.json()
print('Set status to pending:')
print(res.status_code)
print(jsonres)

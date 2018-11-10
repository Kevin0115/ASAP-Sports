# REQUIREMENTS:
# Python3.6 installed
# gunicorn installed and running
# virtualenv installed and activated
# nginx installed and activated
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# !!! prod_settings.py CONFIGURED WITH CORRECT VALUES !!!
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import os
import subprocess, plac
from asapsports import settings
from prod import nginx, systemd  # TODO certbot automation

def call(command):
    res = subprocess.call(command.split(' '))
    print(f'{command} --OUTPUT--> {res}')
    if res != 0:
        raise ValueError()

@plac.annotations(
    app_name=("App name. Will create a user with this name and a PSQL DB.", "option", "a", str),
    domain_name=("The domain name where this app will be hosted.", "option", "d", str))
def main(app_name, domain_name):
    if not app_name or not domain_name:
        print('Missing app name or domain name. Exiting.')
        return
    for sub_dir_name in ['bin', 'logs', 'run']:
        dir_name = os.path.join(settings.PROJECT_ROOT, f'prod/{sub_dir_name}')
        if not os.path.exists(dir_name):
            os.mkdir(dir_name)

    generate_local_settings(settings.PROJECT_APP_PATH, app_name)
    nginx.create_conf_file(domain_name, settings.PROJECT_ROOT, app_name, settings.STATIC_ROOT)
    systemd.create_conf_file(app_name)
    # TODO certbot setup


LOCAL_SETTINGS_TEMPLATE = """
DEBUG = False
FB_APP_SECRET = 'TODO'

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": '%(app_name)s',
        # 'USER': '%(app_name)s',
        # 'PASSWORD': 'password',
        # 'HOST': 'localhost',
        # 'PORT': 5432
    }
}
"""


def generate_local_settings(asap_app_path, app_name):
    with open(asap_app_path + '/local_settings.py', 'w') as f:
        f.write(LOCAL_SETTINGS_TEMPLATE % locals())


if __name__ == '__main__':
    plac.call(main)

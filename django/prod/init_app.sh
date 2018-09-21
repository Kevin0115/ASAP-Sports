#!/usr/bin/env bash

DOMAIN_NAME=$1
VENV_BIN=/webapps/asapsports/asapsports/bin
DJANGO=/webapps/asapsports/ASAP-Sports/django
echo 'App/owner/db name is asapsports'

sudo mkdir /webapps/asapsports
sudo useradd --system --gid webapps --home /webapps/asapsports asapsports
echo 'Enter a password for user asapsports:'
sudo passwd asapsports
sudo chown -R asapsports:users /webapps/asapsports
cd /webapps/asapsports
sudo git clone https://github.com/Kevin0115/ASAP-Sports
sudo -u asapsports virtualenv -p $(which python3.6) asapsports
cd ASAP-Sports/django
sudo $VENV_BIN/pip3.6 install -r requirements.txt

# Create Nginx/systemd conf files and
sudo $VENV_BIN/python3.6 production.py -a asapsports -d $DOMAIN_NAME
sudo systemctl daemon-reload
service nginx restart
sudo systemctl start asapsports

sudo chown -R asapsports:webapps $DJANGO
sudo chmod -R g+w $DJANGO

sudo -u postgres createuser asapsports
sudo -u postgres createdb --owner asapsports asapsports

# Only needed if we use ORM
sudo -u asapsports $VENV_BIN/python $DJANGO/asapsports/manage.py migrate
sudo -u asapsports $VENV_BIN/python $DJANGO/asapsports/manage.py createsuperuser

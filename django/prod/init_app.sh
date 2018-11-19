#!/usr/bin/env bash

DOMAIN_NAME=$1
APP_NAME=$2

VENV_BIN=/webapps/$APP_NAME/$APP_NAME/bin
DJANGO=/webapps/$APP_NAME/ASAP-Sports/django
echo 'App/owner/db name is '$APP_NAME

sudo mkdir /webapps/$APP_NAME
sudo useradd --system --gid webapps --home /webapps/$APP_NAME $APP_NAME
echo 'Enter a password for user '$APP_NAME':'
sudo passwd $APP_NAME
# TODO Double check chowns
sudo chown -R $APP_NAME:users /webapps/$APP_NAME
cd /webapps/$APP_NAME
sudo git clone https://github.com/aidoraide/ASAP-Sports
sudo virtualenv -p $(which python3.6) $APP_NAME
cd ASAP-Sports/django
sudo $VENV_BIN/pip3.6 install -r requirements.txt

# Create Nginx/systemd conf files and
sudo $VENV_BIN/python3.6 production.py -a $APP_NAME -d $DOMAIN_NAME

# TODO Double check chowns
# Set file/directory permissions
sudo chown -R $APP_NAME:users /webapps/$APP_NAME
sudo chown -R $APP_NAME:webapps $DJANGO
sudo chmod -R g+w $DJANGO

# Create DB
sudo -u postgres createuser $APP_NAME
sudo -u postgres createdb --owner $APP_NAME $APP_NAME
sudo -u $APP_NAME psql -f "prod/createdb.sql"

# Now that the files are all setup and
sudo systemctl daemon-reload
sudo service nginx restart
sudo systemctl start $APP_NAME
sudo systemctl restart $APP_NAME

# Only needed if we use ORM
# sudo -u $APP_NAME $VENV_BIN/python $DJANGO/$APP_NAME/manage.py migrate
# sudo -u $APP_NAME $VENV_BIN/python $DJANGO/$APP_NAME/manage.py createsuperuser

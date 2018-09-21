#!/usr/bin/env bash

PREVDIR=$(pwd)
VENV_BIN=/webapps/asapsports/asapsports/bin
DJANGO=/webapps/asapsports/ASAP-Sports/django

cd $DJANGO
git pull

# These two lines are needed if we use Django's ORM
$VENV_BIN/python3.6 $DJANGO/manage.py makemigrations # TODO needs user permission, doesn't update sub apps
$VENV_BIN/python3.6 $DJANGO/manage.py migrate # TODO needs user permission


sudo systemctl restart asapsports

cd $PREVDIR

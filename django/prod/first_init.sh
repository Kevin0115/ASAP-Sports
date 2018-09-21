#!/usr/bin/env bash

# Python/pip
sudo apt-get update
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get -y install python3.6
sudo apt-get -y install python3-pip

# Nginx
sudo apt-get -y install nginx

# Certbot
sudo apt-get -y install software-properties-common
sudo add-apt-repository -y ppa:certbot/certbot
sudo apt-get update
sudo apt-get -y install python-certbot-nginx

#PostgresQL 10
sudo add-apt-repository 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | \
  sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql-10
sudo -u postgres /usr/lib/postgresql/10/bin/pg_ctl -D /var/lib/postgresql/10/main restart # -l logfile TODO

# venv, new user group, /webapps directory
sudo pip3 install virtualenv
sudo groupadd --system webapps
sudo mkdir /webapps
sudo chgrp webapps /webapps
cd /webapps

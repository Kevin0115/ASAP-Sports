#!/bin/bash
echo start
PGPASSWORD=password psql -U asapsports < setup_test.sql
echo finished
exit 1          

         
#!/bin/bash

echo "Setting up Postgres user and database..."

sudo -iu postgres bash << END
psql -c "CREATE ROLE notes_owner WITH CREATEDB CREATEROLE LOGIN PASSWORD 'seton-owner';"
psql -c "CREATE ROLE notes_user WITH LOGIN PASSWORD 'seton-user';"
psql -c "GRANT notes_user TO notes_owner;"
createdb test -O notes_owner
psql -d "test" -c "DROP SCHEMA IF EXISTS public;"
END

echo "Database setup complete"

exit

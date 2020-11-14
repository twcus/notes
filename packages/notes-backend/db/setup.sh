#!/bin/bash

echo "Setting up Postgres user and database..."

source .env

sudo -iu postgres bash << END
psql -c "CREATE ROLE $OWNER_NAME WITH CREATEDB CREATEROLE LOGIN PASSWORD '$OWNER_PW';"
psql -c "CREATE ROLE $USER_NAME WITH LOGIN PASSWORD '$USER_PW';"
psql -c "GRANT $USER_NAME TO $OWNER_NAME;"
createdb notes -O $OWNER_NAME
psql -d "notes" -c "DROP SCHEMA IF EXISTS public;"
END

echo "Database setup complete"

exit

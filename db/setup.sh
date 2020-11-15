#!/bin/bash

echo "Setting up Postgres user and database..."

sudo -iu postgres bash << END
psql -c "CREATE USER notes_admin WITH PASSWORD 'notes_admin';"
psql -c "CREATE DATABASE notes;"
psql -c "GRANT ALL PRIVILEGES ON DATABASE notes TO notes_admin;"
END

echo "Database setup complete"

exit

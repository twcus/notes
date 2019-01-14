# Notes Database

The notes backend uses a PostgreSQL database to store its data, and sqitch to maintain database migrations.

## Setup

### Install Postgres

Install it

### Database setup

To setup the notes database, run the shell script.

```
./setup.sh
```

This script uses the default Postgres user to create the required roles and database for the notes app.
# Notes App (name pending...)

This is a web application for note taking. This app uses a tag-based method of organization,
rather than a more traditional "notebook" one. With tags, users can quickly filter through notes,
and save common tag combinations as collections for quick access.

## Features
* Take notes using a WYSIWYG editor
* Search through notes by notes
* Create tags and attach them to notes for easy filtering
* Save common tag filter combinations as collections for quick access to subsets of notes

## Getting Started
### Prerequisites
Install [Node v10.x](https://nodejs.org/en/), [Postgres v11.x](https://www.postgresql.org/), and [Yarn](https://yarnpkg.com/).

### Install Dependencies
```
yarn
```

### UI
```
yarn start:ember
```

### API
#### Prerequisites
Create a `.env` file in the root project directory with the required environment variables. For development environments,
the JWT_SECRET is arbitrary, but the DATABASE_URL must remain as below, unless you manually change the default database setup.
```
JWT_SECRET=jwtdevsecret
DATABASE_URL=postgres://notes_admin:notes_admin@localhost:5432/notes
```

#### Start
```
yarn start
```

### Database
#### Setup Postgres DB and User
```
cd db && ./setup.sh
```

*Note: This doesn't currently set up an initial user in the database. This must be done manually.*

### Test
Coming Soon™

### Heroku Deployment
This app is easily deployable with Heroku on a single dyno.

#### Prerequisites
This section assumes that you already have a [Heroku](https://www.heroku.com/) account,
have installed [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli),
and have basic familiarity with Heroku.

You also need to generate a JWT secret key, which can be done in a [number of ways](https://www.google.com/search?q=generate+jwt+secret).

#### Deploy
```
heroku login
heroku create <appname>
heroku addons:create heroku-postgresql
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set JWT_SECRET=<jwt_secret>
git push heroku master
heroku open
```

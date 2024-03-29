import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import validateJWT from 'express-jwt';
import cors from 'cors';
import * as pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import fortune from 'fortune';
import fortuneHttp from 'fortune-http';
import jsonApiSerializer from 'fortune-json-api';
import postgresAdapter from 'fortune-postgres';
import models from './models';
import hooks from './hooks';
import logger from './logger';
import { isUnauthedRoute, logRequest } from './utils';

logger.info('Starting server...');

dotenv.config();
// Check for required environment variables
const REQUIRED_VARS = ['JWT_SECRET', 'DATABASE_URL'];
REQUIRED_VARS.forEach( envvar => {
    if (!process.env[envvar]) {
        logger.fatal(`Error: Environment variable ${envvar} must be set.`);
        throw new Error('Error configuring server.');
    }
})

// Set up Postgres connection and Fortune adapter
const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
const postgresAdapterOptions = {
    pool,
    primaryKeyType: 'serial',
    generatePrimaryKey: null
};
const adapter = [postgresAdapter, postgresAdapterOptions];

// Set up Fortune
const fortuneOptions = {
    adapter,
    hooks
};
const store = fortune(models, fortuneOptions);
const serializerOptions = {
    jsonSpaces: 4,
    prefix: '/api'
};
const listenerOptions = {
    serializers: [
        [ jsonApiSerializer, serializerOptions ]
    ]
};
const listener = fortuneHttp(store, listenerOptions);

// Set up Express server
const server = express();

server.use(cors());

// Parses request body as JSON
server.use(bodyParser.json());

// Always redirect to HTTPS in production
server.use((request, response, next) => {
    // For Heroku deployments, request.secure will always be false, so must use the x-forwarded-header proto to determine
    // if the request is HTTPS. It might be different for other cloud hosts, something to keep in mind.
    if (request.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
        response.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
        response.redirect(301, `https://${request.headers.host}${request.url}`);
    } else {
        next();
    }
});

// Specify UI build directory
server.use(express.static(__dirname + "/public/"));

// Validate the JWT
server.use(validateJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
}).unless({ custom: isUnauthedRoute }));

// Use Fortune listener to perform data operations
server.use((request, response, next) => {
    // Don't use Fortune for routes that don't require authentication
    if (isUnauthedRoute(request)) {
        return next();
    }
    listener(request, response)
        .then(() => logRequest(request, response))
        .catch(error => {
            logRequest(request, response);
            logger.error(error);
        });
});

// Handle login requests
server.post('/api/login', (request, response) => {
    let { username, password } = request.body;
    username = username.toLowerCase().trim();
    if (!username || !password) {
        return response.status(400).send('Username and password are required.');
    }
    // Query PG for user
    pool.query('SELECT * FROM "account" WHERE LOWER(username) = $1', [username])
        .then(users => {
            const user = users.rows[0];
            // Compare password hash if user is found
            return bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        // Generate a JWT
                        const token = jwt.sign({ username: user.username,  id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
                        logRequest(request, response);
                        return response.json({
                            user: {
                                username: user.username,
                                userId: user.id
                            },
                            token
                        });
                    } else {
                        // TODO Better error handling
                        throw new Error();
                    }
                });
        })
        .catch(err => {
            logger.error(err);
            response.status(401).send('Incorrect username or password.');
            logRequest(request, response);
        });
});

server.use((error, request, response, next) => {
    logRequest(request, response);
    if (error.name === 'UnauthorizedError') {
        response.status(401).send('Invalid token.');
    } else {
        response.sendStatus(500);
    }
});

server.listen(process.env.PORT || 8080);
logger.success('Server started successfully');
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

dotenv.config();
const { Pool } = pg;

// TODO Get secret from env variable
const jwtSecret = process.env.JWT_SECRET;

// TODO Get connection string from env variable
const connectionString = process.env.PG_CONNECTION;

const pool = new Pool({ connectionString });

const postgresAdapterOptions = {
    pool,
    primaryKeyType: 'serial',
    generatePrimaryKey: null
};

const adapter = [postgresAdapter, postgresAdapterOptions];

const fortuneOptions = {
    adapter,
    hooks
};

const store = fortune(models, fortuneOptions);

const serializerOptions = {
    jsonSpaces: 4
};

const listenerOptions = {
    serializers: [
        [ jsonApiSerializer, serializerOptions ]
    ]
};

const listener = fortuneHttp(store, listenerOptions);

const server = express();

server.use(cors());

// Parses request body as JSON
server.use(bodyParser.json())

// Validates the JWT
server.use(validateJWT({
    secret: jwtSecret,
    algorithms: ['HS256']
}).unless({ path: '/login' }));

// Use Fortune listener to perform data operations
server.use((request, response, next) => {
    // Don't use Fortune for login route
    if (request.path === '/login') {
        return next();
    }
    listener(request, response)
        .catch(error => {
            console.log(error); // eslint-disable-line no-console
        });
});

server.post('/login', (request, response) => {
    const { username, password } = request.body;
    if (!username || !password) {
        return response.status(400).send('Username and password are required.');
    }
    // Query PG for user
    pool.query('select * from "user" where username = $1', [username])
        .then(users => {
            const user = users.rows[0];
            // Compare password hash if user is found
            return bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        // Generate a JWT
                        const token = jwt.sign({ username: user.username,  id: user.id }, jwtSecret);
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
        .catch(() => response.status(401).send('Incorrect username or password.'));
});

server.listen(8080);
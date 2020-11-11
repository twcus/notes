import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import validateJWT from 'express-jwt';
import cors from 'cors';
import fortune from 'fortune';
import fortuneHttp from 'fortune-http';
import jsonApiSerializer from 'fortune-json-api';
import postgresAdapter from 'fortune-postgres';
import models from './models';
import hooks from './hooks';

const user = 'notes_user';
const password = 'seton-user';
const host = 'localhost';
const port = 5432;
const db = 'notes';
const testdb = 'test';

const postgresAdapterOptions = {
    url: `postgres://${user}:${password}@${host}:${port}/${testdb}`,
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
    secret: 'youraccesstokensecret',
    algorithms: ['HS256']
}).unless({ path: '/login' }));

// Use Fortune listener to perform data operations
server.use((request, response, next) => {
    if (request.path === '/login') {
        return next();
    }

    listener(request, response)
        .catch(error => {
            console.log(error); // eslint-disable-line no-console
        });
});

const users = [
    {
        username: 'twcus',
        password: 'admin'
    }, {
        username: 'anna',
        password: 'password123member'
    }
];

const accessTokenSecret = 'youraccesstokensecret';

server.post('/login', (request, response) => {
    const { username, password } = request.body;
    const user = users.find(u => { return u.username === username && u.password === password });
    if (user) {
        // Generate an access token
        const token = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

        response.json({
            token
        });
    } else {
        response.send('Username or password incorrect.');
    }
});

server.listen(8080);
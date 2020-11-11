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

// This ensures that only records belonging to the user specified by the JWT are returned.
// See https://github.com/fortunejs/fortune/issues/317
const originalRequest = store.request
store.request = function(contextRequest) {
    contextRequest.options.match = { user: contextRequest.meta.request.user.userid }
    return originalRequest.call(this, contextRequest);
};

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
    // Skip JWT validation for login route.
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
        password: 'admin',
        id: 1
    }, {
        username: 'anna',
        password: 'password123member',
        id: 2
    }
];

const accessTokenSecret = 'youraccesstokensecret';

server.post('/login', (request, response) => {
    const { username, password } = request.body;
    const user = users.find(u => { return u.username === username && u.password === password });
    if (user) {
        // Generate an access token
        const token = jwt.sign({ username: user.username, userid: user.id }, accessTokenSecret);

        response.json({
            token
        });
    } else {
        response.statusCode = 401;
        response.send('Incorrect username or password.');
    }
});

server.listen(8080);
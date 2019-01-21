import http from 'http';
import fortune from 'fortune';
import fortuneHttp from 'fortune-http';
import jsonApiSerializer from 'fortune-json-api';
import postgresAdapter from 'fortune-postgres';
import models from './models';

const user = 'notes_user';
const password = 'seton-user';
const host = 'localhost';
const port = 5432;
const db = 'notes';

const postgresAdapterOptions = {
    url: `postgres://${user}:${password}@${host}:${port}/${db}`,
    primaryKeyType: 'serial',
    generatePrimaryKey: null
};

const adapter = [postgresAdapter, postgresAdapterOptions];

const store = fortune(models, { adapter });

const serializerOptions = {
    jsonSpaces: 4
};

const listenerOptions = {
    serializers: [
        // The `options` object here is optional.
        [ jsonApiSerializer, serializerOptions ]
    ]
};

// `instance` is an instance of Fortune.js.
const listener = fortuneHttp(store, listenerOptions);

// The listener function may be used as a standalone server, or
// may be composed as part of a framework.
const server = http.createServer((request, response) =>
    listener(request, response)
        .catch(error => {
            console.log(error); // eslint-disable-line no-console
        }));

server.listen(8080);
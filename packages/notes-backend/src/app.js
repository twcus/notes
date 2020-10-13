import express from 'express';
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
server.use((request, response) =>
    listener(request, response)
        .catch(error => {
            console.log(error); // eslint-disable-line no-console
        }));

server.listen(8080);
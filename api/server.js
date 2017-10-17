'use strict';

const Hapi = require('hapi');
const connection = require('./server/connection');
const onLoaded = require('./server/onLoaded');
const pluginList = require('./server/pluginList');

const server = new Hapi.Server();
server.connection(connection());



pluginList().then(plugins => server.register(
    plugins, onLoaded(server))
);
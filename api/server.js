'use strict';

var wait = require('wait-for-stuff');
const Hapi = require('hapi');
const connection = require('./server/connection');
const onLoaded = require('./server/onLoaded');
const pluginList = require('./server/pluginList');

const server = new Hapi.Server();
server.connection(connection());
const plugins = wait.for.promise(pluginList());
console.log('waddup fishes', plugins);
server.register(plugins, onLoaded(server));      
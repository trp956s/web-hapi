'use strict';

const Hapi = require('hapi');
const connection = require('./server/connection');
const onLoaded = require('./server/onLoaded');
const pluginList = require('./server/pluginList');
const co = require('co');

const server = new Hapi.Server();
server.connection(connection());

return new Promise(resolve =>{
    co(function*(){
        let plugins = yield pluginList();
        let err = yield new Promise(resolve => {
            server.register(plugins, resolve);
        });
        if (err) {
            console.error('Failed to load plugins:', err);
        }
    });

    onLoaded(server);
    resolve();
});
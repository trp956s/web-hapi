'use strict';

const HapiServer = require('./hapiServer');
const connection = require('./server/connection');
const startTheServer = require('./server/onLoaded');
const pluginList = require('./server/pluginList');
const co = require('co');

const server = HapiServer();
server.connection(connection());

module.exports = new Promise((resolve, reject) => {
    co(function*(){
        let plugins = yield pluginList();
        let err = yield new Promise(resolve => 
            server.register(plugins, resolve)
        );
        if (err) {
            console.log('Failed to load plugins:', err);
            reject(err);
        }

        startTheServer(server);
        resolve();
    });
});

'use strict';

const Hapi = require('hapi');
const connection = require('./server/connection');
const onLoaded = require('./server/onLoaded');
const pluginList = require('./server/pluginList');

const server = new Hapi.Server();
server.connection(connection());
(async () => {
  const registerArray = await pluginList();
  server.register(registerArray, onLoaded(server));      
})(); 
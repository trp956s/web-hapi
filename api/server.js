'use strict';

const Hapi = require('hapi');
const connection = require('./server/connection');
const glob = require( "glob-promise" );
const onLoaded = require('./server/onLoaded');

const server = new Hapi.Server();
(async () => {
  connection(server);
  let localPath = require('path').basename(__dirname);

  const registerJavaFiles = await glob(`${localPath}/server/register/*.js`);
  const registerArray = registerJavaFiles.map(file=>require(`../${file}`)());

  server.register(registerArray, onLoaded(server));      
})(); 
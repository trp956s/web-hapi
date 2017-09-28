'use strict';

const Hapi = require('hapi');
const connection = require('./server/connection');
const glob = require( "glob-promise" );

const server = new Hapi.Server();
(async () => {
  connection(server);
  let localPath = require('path').basename(__dirname);

  const registerJavaFiles = await glob(`${localPath}/server/register/*.js`);
  const registerArray = registerJavaFiles.map(file=>require(`../${file}`)());

  server.register(registerArray,function(err) {
      if (err) {
          console.error('Failed to load plugins:', err);
      }

      server.start((err)=>{
        if(err){
          throw err;
        }

        console.log('Server running at', server.info.uri);
      });      
  });
})(); 
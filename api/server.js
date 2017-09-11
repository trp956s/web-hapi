'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/address/city',
  handler: function(request, reply){
    return reply()
  }
});

server.register({
    register: require('ot-hapi-health'),
    options: {
    	isHealthy: cb => cb(true) // optional async validator to establish app readiness 
    }
}, function(err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

  server.start((err)=>{
    if(err){
      throw err;
    }

    console.log('Server running at', server.info.uri);
  });
});

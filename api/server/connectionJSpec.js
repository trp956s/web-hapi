const testObject = require('./connection.js');
const Hapi = require('hapi');

describe('set connection', ()=>{
   it('should connect to localhost at port 3000', ()=>{
       const server = new Hapi.Server();
       testObject(server);

       expect(server.connections.length).toBe(1);
       expect(server.connections[0].settings.host).toBe('localhost');
       expect(server.connections[0].settings.port).toBe(8000);
   });
});

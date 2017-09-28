const testObject = require('./connection');
const Hapi = require('hapi');
const Os = require('os');

describe('set connection', ()=>{
   it('should connect to localhost at port 3000', ()=>{
       const server = new Hapi.Server();
       server.connection(testObject());

       expect(server.connections.length).toBe(1);
       expect(server.connections[0].settings.host).toBe('localhost');
       expect(server.connections[0].settings.port).toBe(8000);
   });

   it('should not make other changes to the server', ()=>{
       Date.now = jest.fn(() => 1482363367071);
       process.hrtime  = jest.fn(() => 1482363367071);
       Os.hostname = jest.fn(() => 'foo');;
       process.pid = 'bar';

       const server = new Hapi.Server();

       server.connection(testObject());

       expect(server).toMatchSnapshot();
   });
});

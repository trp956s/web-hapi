const testObject = require('../api/startServer.js');

describe('startServer', ()=>{
   it('should call start on a hapi server at the right address with routes', ()=>{
      var mockServer = {
         start: jasmine.createSpy('start server')
      };
      var mockHapi = {
         Hapi:{
            Server: ()=>mockServer
         }
      };
      var mockSetupServerRoutes = jasmine.createSpy('mock setup server routes');

      var mockCreateServerConnection = {};

      testObject(mockHapi, mockCreateServerConnection, mockSetupServerRoutes);
   });
});

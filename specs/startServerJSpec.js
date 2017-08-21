const testObject = require('startServer.js');

describe('startServer', ()=>{
   it('should call start on a hapi server at the right address with routes', ()=>{
      val mockServer = {
         start = jasmine.createSpy('start server')
      };
      val mockHapi = {
         Hapi.Server = ()=>mockServer
      };
      val mockSetupServerRoutes = jasmine.createSpy('mock setup server routes');

      testObject(mockHapi, mockCreateServerConnection, mockSetupServerRoutes);
   });
});

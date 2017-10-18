let hapiRouteHeararchyFake = {};
jest.mock('hapi-route-hierarchy', ()=>{
    return hapiRouteHeararchyFake;
});
const hapiRouteHeararchy = require('./hapi-route-hierarchy');
const fs = require('fs');

describe('register hapi-route-hierarchy', ()=> {
   it('should register the hapi-route-hierarchy', () => {
       const service = hapiRouteHeararchy();

       expect(service.register).toEqual(hapiRouteHeararchyFake);
   });

   it('should set the directory to routes', async () => {
       const service = hapiRouteHeararchy();

       expect(service.options).toBeTruthy;
       
       expect(fs.existsSync(service.options.root)).toBeTruthy;
       const stats = fs.statSync(service.options.root);
       expect(stats.isDirectory()).toBeTruthy;
       expect(fs.realpathSync(service.options.root).split('/').slice(-1)[0]).toEqual('routes');
   });

   it('should set the glob pattern to get the non-test files', async () => {
       const service = hapiRouteHeararchy();
       const glob = require( "glob-promise" );
        
       const result = await glob(`${service.options.root}${service.options.glob_pattern}`);

       const path = require('path');
       const localPath = path.relative(path.resolve('.'), __dirname);
       const allRouteFiles = fs.readdirSync(`${localPath}/../../routes`);
       const nonTestRouteFiles = allRouteFiles.filter(fileName => !fileName.endsWith('.test.js'));
       expect(result.length).toEqual(nonTestRouteFiles.length);
   });
});
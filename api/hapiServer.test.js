const Hapi = require('hapi');
const HapiServer = require('./hapiServer');

describe('hapiServer', ()=>{
    const resolveRegistration = (ignore,resolve)=>resolve();
    it('should return a new hapi server', ()=>{
        expect(HapiServer)
            .toEqual(jasmine.any(Hapi.Server));
    });
});
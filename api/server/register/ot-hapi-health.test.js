jest.mock('mongodb', ()=>{
    return {Db:()=>{}, Server:()=>{}};
});
const registerHapiHealth = require('./ot-hapi-health');

describe('register hapi-health', ()=>{
    it('should return registration for ot-hapi-health', ()=>{
        const registration = registerHapiHealth();
        
        expect(registration.register).toEqual(
            require('ot-hapi-health')
        );
    });

    it('should add a healthy callback', ()=>{
        const registration = registerHapiHealth();
        
        expect(registration.options).toBeTruthy;
        expect(registration.options.isHealthy).toBeTruthy;
        expect(registration.options.isHealthy).toEqual(jasmine.any(Function));
    });

    it('should fail if the addresses database is not connected', ()=>{
        const registration = registerHapiHealth();
        const isHealthy = registration.options.isHealthy;

        
    });
});

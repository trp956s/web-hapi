let dbFake = jasmine.createSpy('Db');
let serverFake = jasmine.createSpy('Server');
jest.mock('mongodb', ()=>{
    return {Db:dbFake, Server:serverFake};
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
        let actualError;

        dbFake.and.throwError('');

        try {
            isHealthy();
        } catch(e) {
            actualError = e;
        }

        expect(actualError).toBeTruthy;
    });

    it('should fail if database connection returns an error', ()=>{
        const isHealthy = registerHapiHealth().options.isHealthy;
        const dbFakeInstance = {open:callback=>{callback({fake:'error'})}};
        let actualError;

        dbFake.and.returnValue(dbFakeInstance);

        try {
            isHealthy();
        } catch(e) {
            actualError = e;
        }

        expect(actualError).toBeTruthy;
    });

    it('should close the db', () => {
        const isHealthy = registerHapiHealth().options.isHealthy;
        const dbCloseSpy = jasmine.createSpy('close');
        const foo = ()=>{};
        let openWasCalled;
        const dbFakeInstance = {
            open:callback => {
                openWasCalled = true;
                expect(dbCloseSpy).not.toHaveBeenCalled;
                callback();
                expect(dbCloseSpy).toHaveBeenCalled;
            },
            close: dbCloseSpy
        };

        dbFake.and.returnValue(dbFakeInstance);

        isHealthy(foo);

        expect(openWasCalled).toBeTruthy;
    });

    it('should call done', () => {
        const isHealthy = registerHapiHealth().options.isHealthy;
        const callbackSpy = jasmine.createSpy('cb');
        let closeWasCalled;
        const dbFakeInstance = {
            open:callback => callback(),
            close: () => {
                closeWasCalled = true;
                expect(callbackSpy).not.toHaveBeenCalled()
            }
        };

        dbFake.and.returnValue(dbFakeInstance);

        isHealthy(callbackSpy);

        expect(callbackSpy).toHaveBeenCalledWith(true);
        expect(closeWasCalled).toBeTruthy;
    });    
});

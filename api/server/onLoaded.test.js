const onLoaded = require('./onLoaded');

describe('onLoaded', ()=>{
    it('should start the server', ()=>{
        const startSpy = jasmine.createSpy('start');
        const serverFake = {start: startSpy};

        onLoaded(serverFake);

        expect(startSpy.calls.count()).toEqual(1);
        let callback = startSpy.calls.first().args[0];
        expect(callback).toEqual(jasmine.any(Function));
    });
        
    it('should throw server errors', ()=>{
        let actualError;
        let fakeError = {};
        const serverFake = {start: jasmine.createSpy('start')};
        onLoaded(serverFake);
        const callback = serverFake.start.calls.first().args[0];
        try{
            callback(fakeError);
        } catch(e) {
            actualError = e;
        }

        expect(actualError).toEqual(fakeError);
    });
});
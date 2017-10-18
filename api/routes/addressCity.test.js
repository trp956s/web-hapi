const testObject = require('./addressCity');
const Hapi = require('hapi');

describe('address city', ()=>{
    it('returns a get endpoint', () => {

        const endpoint = testObject();
        delete endpoint.handler;

        expect(endpoint).toEqual({
            method: 'GET',
            path: 'address/city'
        });
    });

    it('handles requests with success', () => {
        const replySpy = jasmine.createSpy('reply');
        
        testObject().handler(null, replySpy);
        expect(replySpy).toHaveBeenCalledWith();
    });
});
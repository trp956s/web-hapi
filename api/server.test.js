describe('server', ()=>{
    beforeEach(()=>{
        delete require.cache[require.resolve('./server')];
    });

    // it('should set the connection', async ()=>{
    //     const connectionMock = jest.fn();
    //     const fakeServer= {
    //         connection:connectionMock,
    //     };
    //     const serverConstructorMock = jest.fn(()=>{
    //         return fakeServer;
    //     });

    //     require('hapi').Server = serverConstructorMock;
    //     jest.doMock('co', ()=>()=>{});
    //     jest.doMock('./server/connection', ()=>()=>'foo');
    //     jest.doMock('./server/onLoaded', ()=>()=>{});

    //     require('./server');

    //     expect(connectionMock).toHaveBeenCalledWith('foo');
    // });

    it('should send the plugins to get registered', async ()=>{
        const registerSpy = jasmine.createSpy('register');
        const fakePluginList = [{foo:'bar'}];

        delete require.cache[require.resolve('hapi')];
        const Hapi = require('hapi');

        Hapi.Server = function(){
            return {
                connection:jest.fn(),
                register: registerSpy,
            };
        };

        jest.doMock('./server/pluginList', ()=>()=>Promise.resolve(fakePluginList));
        jest.doMock('./server/onLoaded', ()=>()=>{});

        await require('./server');

        expect(registerSpy).toHaveBeenCalledWith(fakePluginList, jasmine.any(Function));
    });

    it('should throw an error if the plugins fail to load', ()=>{
        expect(true).toBeFalsy('test not written');
    });

    it('should run the server AFTER loading all plugins', async ()=>{
        expect(true).toBeFalsy('test not written.  also you should probalby rename onLoaded');
    });
});
const Hapi = require('hapi');

describe('server', ()=>{
    it('should set the connection', async ()=>{
        const connectionMock = jest.fn();
        const fakeServer= {
            connection:connectionMock,
        };
        const serverConstructorMock = jest.fn(()=>{
            return fakeServer;
        });

        require('hapi').Server = serverConstructorMock;
        jest.doMock('co', ()=>()=>{});
        jest.doMock('./server/connection', ()=>()=>'foo');
        jest.doMock('./server/onLoaded', ()=>()=>{});

        await require('./server');

        expect(connectionMock).toHaveBeenCalledWith('foo');
    });

    it('should send the plugins to get registered', async ()=>{
        const registerSpy = jest.fn();
        const fakePluginList = [];
        const fakeServer= {
            connection:()=>{},
            register: registerSpy
        };
        require('hapi').Server = jest.fn(()=>{
            return fakeServer;
        });
        jest.doMock('./server/pluginList', ()=>()=>Promise.resolve(fakePluginList));

        await require('./server');

        expect(registerSpy).toHaveBeenCalledWith(fakePluginList);
    });

    it('should throw an error if the plugins fail to load', async ()=>{
        expect(true).toBeFalsy('test not written');
    });

    it('should run the server AFTER loading all plugins', async ()=>{
        expect(true).toBeFalsy('test not written.  also you should probalby rename onLoaded');
    });
});
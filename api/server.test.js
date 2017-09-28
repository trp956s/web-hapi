const Hapi = require('hapi');

describe('server', ()=>{
    it('should set the connection', ()=>{
        const connectionMock = jest.fn();
        const registerMock = jest.fn();
        const onLoadedMock = jest.fn(() => 'baz');
        const fakeServer= {
            connection:connectionMock,
            register:registerMock
        };
        const serverConstructorMock = jest.fn(()=>{
            return fakeServer;
        });

        require('hapi').Server = serverConstructorMock;
        jest.doMock('./server/connection', ()=>{return jest.fn(() => 'foo');});
        jest.doMock('./server/pluginList', ()=>Promise.resolve('bar'));
        jest.doMock('./server/onLoaded', ()=>onLoadedMock);

        require('./server');

        expect(connectionMock).toHaveBeenCalledWith('foo');
        expect(registerMock).toHaveBeenCalledWith('bar', 'baz');
        expect(onLoadedMock).toHaveBeenCalledWith(fakeServer);
    });
});
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
});
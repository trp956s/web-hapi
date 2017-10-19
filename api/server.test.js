describe('server', ()=>{
    beforeEach(()=>{
        delete require.cache[require.resolve('./hapiServer')];
        delete require.cache[require.resolve('./server')];
    });

    it('should set the connection', async ()=>{
        jest.resetModules();
        const connectionMock = jest.fn();
        const fakeServer= {
            connection:connectionMock,
            register:(ignore,resolve)=>resolve()
        };

        jest.doMock('./hapiServer', ()=> fakeServer);
        jest.doMock('./server/pluginList', ()=>()=>Promise.resolve(fakePluginList));
        jest.doMock('./server/connection', ()=>()=>'foo');
        jest.doMock('./server/onLoaded', ()=>()=>{});

        require('./server');

        expect(connectionMock).toHaveBeenCalledWith('foo');
    });

    it('should send the plugins to get registered', async ()=>{
        jest.resetModules();
        const registerSpy = jest.fn((ignore,callback)=>{callback()});
        jest.doMock('./hapiServer', ()=>{
            return {
                connection : jest.fn(),
                register : registerSpy
            };
        });

        const fakePluginList = [{foo:'bar'}];

        jest.doMock('./server/pluginList', ()=>()=>Promise.resolve(fakePluginList));
        jest.doMock('./server/onLoaded', ()=>()=>{});

        await require('./server');

        expect(registerSpy).toHaveBeenCalledWith(fakePluginList, jasmine.any(Function));
    });

    it('should throw an error if the plugins fail to load', async ()=>{
        jest.resetModules();
        const pluginFailure = {oh:'noes'};
        let actualError;

        jest.doMock('./hapiServer', ()=>{
            return {
                connection : jest.fn(),
                register : jest.fn((ignore,callback)=>{
                    callback(pluginFailure)
                })
            };
        });
        
        jest.doMock('./server/pluginList', ()=>()=>Promise.resolve([]));
        jest.doMock('./server/onLoaded', ()=>()=>{});
        
        try {
            await require('./server');
        } catch(e) {
            actualError = e;
        }

        expect(actualError).toEqual(pluginFailure);
    });

    it('should run the server AFTER loading all plugins', async ()=>{
        jest.resetModules();
        delete require.cache[require.resolve('hapi')];
        const startTheServerSpy = jasmine.createSpy('startTheServer');
        const fakeServer = {
                connection : jest.fn(),
                register: jasmine.createSpy('register').and.callFake((ignore, callback)=>{
                    expect(startTheServerSpy).not.toHaveBeenCalledWith(fakeServer);
                    callback();
                })
            };

        jest.doMock('./hapiServer', ()=>fakeServer);


        jest.doMock('./server/pluginList', ()=>()=>Promise.resolve([]));
        jest.doMock('./server/onLoaded', ()=>startTheServerSpy);

        await require('./server');

        expect(fakeServer.register).toHaveBeenCalled();
        expect(startTheServerSpy).toHaveBeenCalledWith(fakeServer);

        //expect(false).toBeTruthy('this is not done: remove cargo cult code and rename onLoaded');
    });
});
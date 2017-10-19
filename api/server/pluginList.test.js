const pluginList = require('./pluginList');
const fs = require('fs');
const path = require('path');

describe('pluginList', ()=> {
   it('should resolve all files in the register folder', async () => {
       const localPath = path.relative(path.resolve('.'), __dirname);

       const result = await pluginList();
    
       const files = fs.readdirSync(`${localPath}/register`);
       const registerFiles = files.filter(fileName => !fileName.endsWith('.test.js'));

       expect(result.length).toBe(registerFiles.length);
       
       registerFiles.forEach(fileName => {
           expect(result.map(x=>JSON.stringify(x))).toContainEqual(JSON.stringify(require(`./register/${fileName}`)()));
        });
   });
});
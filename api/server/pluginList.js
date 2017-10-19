const glob = require( "glob-promise" );
const path = require('path');

module.exports = async () => {
    const localPath = path.relative(path.resolve('.'), __dirname);
    const registerJavaFiles = await glob(`${localPath}/register/!(*.test.js)`);
    return await registerJavaFiles.map(file=>require(`../../${file}`)());
};
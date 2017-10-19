module.exports = () => {
    return {
      register: require('hapi-route-hierarchy'),
      options: {
          root: __dirname + '/../../routes',
          glob_pattern: '**/!(*.test.js)'
      }
    }
};
const {Db, Server} = require('mongodb');
const assert = require('assert');

module.exports = () => {
    return {
      register: require('ot-hapi-health'),
      options: {
        isHealthy: cb => {
          const db = new Db('addresses', new Server('localhost', 27017));
          db.open(err => {
            assert.equal(null, err);
            console.log("Connected correctly to server");
          
            db.close();
            cb(true);
          });
        }
      }
    }
};

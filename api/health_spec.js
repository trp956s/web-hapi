const frisby = require('frisby');
const shutdownDb = ()=>require('../package-scripts/shutdown-db');
const startDb = ()=>require('../package-scripts/bootup-db');

describe('health endpoint', function () {
  it('should return an error if the database is down', function (done) {
    shutdownDb();

    frisby.get('http://localhost:8000/health')
      .expect('status', 500)
      .done(()=>{
        startDb();
        done();
      });
  });
});

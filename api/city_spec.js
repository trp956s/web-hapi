const frisby = require('frisby');

describe('address city endpoint', function () {
  it('should return 200', function (done) {
    frisby.get('http://localhost:8000/address/city')
      .expect('status', 200)
      .done(done);
  });
});

const frisby = require('frisby');

describe('Posts', function () {
it('should be a teapot', function (done) {
  frisby.get('http://httpbin.org/status/418')
    .expect('status', 418)
    .done(done);
});
});

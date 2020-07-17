const request = require('supertest');
const assert = require('assert');

const app = require('../../../../app');

describe('Basic tests', () => {
  test('Returns 200 on home path', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(e => {
        assert.equal(e, null, e);
        done();
      });
  });
  test('Returns 404 on unknown path', (done) => {
    request(app)
      .get('/unknown/path')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(e => {
        assert.equal(e, null, e);
        done();
      });
  });
});

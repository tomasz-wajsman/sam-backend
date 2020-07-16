const request = require('supertest');
const assert = require('assert');

const app = require('../../../../app');

describe('Activity endpoints tests', () => {
  test('Returns the list of activities', (done) => {
    request(app)
      .get('/activities')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((e, res) => {
        // check if error was not thrown and the response is correct
        assert.equal(e, null, e);
        assert.notEqual(res, null, 'Nothing was received');
        // check if a response is an array of objects and check if has elements
        const activities = res.body.activities;
        assert.equal(Array.isArray(activities), true, 'Activities were not received');
        assert.equal(activities.length > 0, true, 'There are no activities');
        done();
      });
  });
  /*
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
  */
});

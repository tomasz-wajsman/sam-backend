const request = require('supertest');
const assert = require('assert');

const app = require('../../../../app');

const invalidIds = [
  '1234',
  'blah',
  'BLAHBLAHBLAH',
  'abcd1234',
  'zzzzzzzzzzzzzzzzzzzzzzzz'
];

describe('Activities endpoints invalid use tests', () => {
  test('Returns 400 on incorrect IDs', (done) => {
    const promises = [];
    invalidIds.forEach(id => {
      promises.push(
        request(app)
          .get(`/activities/${id}`)
          .expect('Content-Type', /json/)
          .expect(400)
      );
    });
    Promise.all(promises)
      .then(() => done())
      .catch(e => done(e));
  });
});

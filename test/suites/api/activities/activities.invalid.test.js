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

const invalidActivities = [
  { name: 'name' },
  { name: 'name', category: 'category' },
  { name: 'name', category: 'category', start_date: 1 },
  { category: 'category', start_date: 1, end_date: 2 },
  { distance: 1 },
  { start_date: 1, end_date: 2, distance: 1 },
  { start_date: 1, end_date: 1 },
  { name: '', category: '', start_date: 1, end_date: 2, distance: 1 },
  { name: 'name', category: 'category', start_date: 1000, end_date: 1000, distance: 1 },
  { name: 'name', category: 'category', start_date: 1000, end_date: 999, distance: 1 },
  { name: 'name', category: 'category', start_date: 1, end_date: 2, distance: -1000 }
];

describe('Activities endpoints invalid use tests', () => {
  test('Returns 400 on incorrect IDs for getting single activities', (done) => {
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
  test('Returns 400 on incorrect details for creating activities', (done) => {
    const promises = [];
    invalidActivities.forEach(activity => {
      const item = {
        name: activity.name,
        category: activity.category,
        start_date: activity.start_date,
        end_date: activity.end_date,
        distance: activity.distance
      };
      promises.push(
        request(app)
          .post('/activities')
          .send({ activity: item })
          .expect('Content-Type', /json/)
          .expect(400)
      );
    });
    Promise.all(promises)
      .then(() => done())
      .catch(e => done(e));
  });
});

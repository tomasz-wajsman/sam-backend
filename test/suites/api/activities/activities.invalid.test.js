/* eslint-disable no-console */
const request = require('supertest');

const app = require('../../../../app');

let imsConnection;
let mongooseClient;

const MongooseClient = require('../../../../clients/database/MongooseClient');
const inMemoryServer = require('../../../db/mongo');

const models = require('../../../../database/mongo/models');
const mockedActivities = require('../../../mocks/data/activities.json');

const notExistingIds = [
  '111111111111111111111111',
  '222222222222222222222222',
  '333333333333333333333333',
  '444444444444444444444444',
  '555555555555555555555555',
  'ffffffffffffffffffffffff'
];

const invalidIds = [
  '1234',
  'blah',
  'BLAHBLAHBLAH',
  'abcd1234',
  'zzzzzzzzzzzzzzzzzzzzzzzz'
];

const invalidActivities = [
  { activity: {} },
  { activity: { name: 'name' } },
  { activity: { name: 'name', category: 'category' } },
  { activity: { name: 'name', category: 'category', start_date: 1 } },
  { activity: { category: 'category', start_date: 1, end_date: 2 } },
  { activity: { distance: 1 } },
  { activity: { start_date: 1, end_date: 2, distance: 1 } },
  { activity: { start_date: 1, end_date: 1 } },
  { activity: { name: '', category: '', start_date: 1, end_date: 2, distance: 1 } },
  { activity: { name: 'name', category: 'category', start_date: 1000, end_date: 1000, distance: 1 } },
  { activity: { name: 'name', category: 'category', start_date: 1000, end_date: 999, distance: 1 } },
  { activity: { name: 'name', category: 'category', start_date: 1, end_date: 2, distance: -1000 } }
];

describe('Activities endpoints invalid use tests', () => {
  beforeAll(async () => {
    try {
      // try connecting to the server
      imsConnection = await inMemoryServer.connect();
      mongooseClient = new MongooseClient(imsConnection);
      // insert the data
      await models.Activity.insertMany(mockedActivities);
    } catch (ex) {
      console.error(ex);
    }
  });
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
          .send({ item })
          .expect('Content-Type', /json/)
          .expect(400)
      );
    });
    Promise.all(promises)
      .then(() => done())
      .catch(e => done(e));
  });
  test('Returns 404 on incorrect identifiers for GET single item request', (done) => {
    const promises = [];
    notExistingIds.forEach(id => {
      promises.push(
        request(app)
          .get(`/activities/${id}`)
          .expect('Content-Type', /json/)
          .expect(404)
      );
    });
    Promise.all(promises)
      .then(() => done())
      .catch(e => done(e));
  });
  afterAll(async () => {
    try {
      await inMemoryServer.disconnect();
      await mongooseClient.disconnect();
    } catch (ex) {
      console.error(ex);
    }
  });
});

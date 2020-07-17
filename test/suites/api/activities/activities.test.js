/* eslint-disable no-console */
const request = require('supertest');
const assert = require('assert');

const app = require('../../../../app');

let imsConnection;
let imsUrl;
let mongooseClient;

const MongooseClient = require('../../../../clients/database/MongooseClient');
const inMemoryServer = require('../../../db/mongo');

const models = require('../../../../database/mongo/models');
const mockedActivities = require('../../../mocks/data/activities.json');

const activityIds = [];

describe('Activity endpoints tests', () => {
  beforeAll(async () => {
    try {
      // try connecting to the server
      imsUrl = await inMemoryServer.getConnectionString();
      imsConnection = await inMemoryServer.connect();
      mongooseClient = new MongooseClient(imsConnection);
      // insert the data
      await models.Activity.insertMany(mockedActivities);
    } catch (ex) {
      console.error(ex);
    }
  });
  test('Returns the list of activities', done => {
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
        assert.equal(activities.length, mockedActivities.length, 'Wrong activities count');
        // add activity identifiers for later tests
        activities.forEach(activity => activityIds.push(activity['_id']));
        done();
      });
  });
  test('Returns the single activities', done => {
    const promises = [];
    activityIds.forEach(id => {
      promises.push(
        request(app)
          .get(`/activities/${id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            // check if error was not thrown and the response is correct
            assert.notEqual(res, null, 'Nothing was received');
            // check if a response is the object
            const activity = res.body.activity;
            // check ID and other fields
            assert.notEqual(activity['_id'], undefined, 'The activity has no ID');
            assert.equal(activity['_id'], id, 'The activity has an incorrect ID');
            assert.notEqual(activity.name, undefined, 'The activity name was not received');
            assert.notEqual(activity.category, undefined, 'The activity category was not received');
            assert.notEqual(activity.start_date, undefined, 'The activity start date was not received');
            assert.notEqual(activity.end_date, undefined, 'The activity end date was not received');
          })
      );
    });
    Promise.all(promises)
      .then(() => done())
      .catch(e => done(e));
  });
  test('Creates the activity', done => {
    const activityDetails = {
      name: 'Basketball training',
      category: 'basketball',
      start_date: 1594977660,
      end_date: 1594981260
    };
    request(app)
      .post('/activities')
      .send({
        name: activityDetails.name,
        category: activityDetails.category,
        start_date: activityDetails.start_date,
        end_date: activityDetails.end_date
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        const activity = res.body.activity;
        // check if error was not thrown and the response is correct
        assert.notEqual(res, null, 'Nothing was received');
        // check if the response contains the ID
        assert.notEqual(activity['_id'], undefined, 'The activity has no ID');
        assert.notEqual(activity.name, undefined, 'The activity name was not received');
        assert.notEqual(activity.category, undefined, 'The activity category was not received');
        assert.notEqual(activity.start_date, undefined, 'The activity start date was not received');
        assert.notEqual(activity.end_date, undefined, 'The activity end date was not received');
      });
  });
  afterAll(async () => {
    try {
      await inMemoryServer.disconnect();
      await mongooseClient.disconnect();
    } catch (ex) {
      console.error(ex);
    }
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

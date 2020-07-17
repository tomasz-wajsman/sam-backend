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

const tempActivities = {};
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
        activities.forEach(activity => {
          tempActivities[activity['_id']] = activity;
        });
        done();
      });
  });
  test('Returns the single activities', done => {
    const promises = [];
    Object
      .keys(tempActivities)
      .forEach(id => {
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
              assert.equal(activity['_id'], tempActivities[id]['_id'], 'The activity has an incorrect ID');
              assert.equal(activity.name, tempActivities[id].name, 'The activity name was not received');
              assert.equal(activity.category, tempActivities[id].category, 'The activity category was not received');
              assert.equal(activity.start_date, tempActivities[id].start_date, 'The activity start date was not received');
              assert.equal(activity.end_date, tempActivities[id].end_date, 'The activity end date was not received');
            })
        );
      });
    Promise.all(promises)
      .then(() => done())
      .catch(e => done(e));
  });
  test('Creates the activity', done => {
    const activityDetails = {
      name: 'Nordic Combined',
      category: 'winter sports',
      start_date: 1594977660,
      end_date: 1594981260,
      distance: 10000
    };
    request(app)
      .post('/activities')
      .send({ activity: activityDetails })
      .expect('Content-Type', /json/)
      .expect(201)
      .then(res => {
        // check if error was not thrown and the response is correct
        assert.notEqual(res, null, 'Nothing was received');
        // check if the response contains the ID and other parameters
        const activity = res.body.activity;
        assert.notEqual(activity, undefined, 'The activity was not returned');
        assert.notEqual(activity['_id'], undefined, 'The activity has no ID');
        assert.equal(activity.name, activityDetails.name, 'The activity name is wrong');
        assert.equal(activity.category, activityDetails.category, 'The activity category is wrong');
        assert.equal(activity.start_date, activityDetails.start_date, 'The activity start date is wrong');
        assert.equal(activity.end_date, activityDetails.end_date, 'The activity end date is wrong');
        assert.equal(activity.distance, activityDetails.distance, 'The activity distance is wrong');
        // add the activity to temporary store
        tempActivities[activity['_id']] = activity;
        done();
      });
  });
  test('Modifies the activities', done => {
    const promises = [];
    Object
      .keys(tempActivities)
      .forEach(key => {
        const modifiedActivity = { ...tempActivities[key] };
        modifiedActivity.name = 'Modified name';
        tempActivities[key] = modifiedActivity;
        promises.push(
          request(app)
            .put(`/activities/${key}`)
            .send({ activity: modifiedActivity })
            .expect(204)
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

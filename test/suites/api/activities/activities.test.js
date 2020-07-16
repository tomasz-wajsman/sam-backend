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
        assert.equal(activities.length, mockedActivities.length, 'Wrong activities count');
        done();
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

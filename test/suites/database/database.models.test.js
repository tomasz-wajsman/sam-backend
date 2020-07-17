/* eslint-disable no-console */
const assert = require('assert');

const MongooseClient = require('../../../clients/database/MongooseClient');

let imsConnection;
let mongooseClient;

const inMemoryServer = require('../../db/mongo');

const models = require('../../../database/mongo/models');
const mockedData = require('../../mocks/data/examples.json');

describe('POI model tests', () => {
  beforeAll(async () => {
    try {
      // try connecting to the server
      imsConnection = await inMemoryServer.connect();
      mongooseClient = new MongooseClient(imsConnection);
    } catch (ex) {
      console.error(ex);
    }
  });
  test('Inserts data of examples', async () => {
    await models.Example.insertMany(mockedData.examples);
    const data = await models.Example.find();
    assert.equal(data.length, mockedData.examples.length, 'Examples set was incorrectly inserted');
  });
  test('Finds all examples with user ID of 1 or 2', async () => {
    const ids = [1, 2];
    const data = await models.Example.find({
      userId: { $in: ids }
    });
    assert.equal(data.length, 3, 'Wrong amount of returned examples');
  });
  test('Checks if example with ID 4 is in the database', async () => {
    const data = await models.Example.find({ id: 4 });
    assert.equal(data.length, 1, 'The example with ID 4 was not found');
  });
  test('Checks if example with ID 8 is in the database', async () => {
    const data = await models.Example.find({ id: 8 });
    assert.equal(data.length, 0, 'The example with ID 8 was found');
  });
  test('Deletes the examples properly', async () => {
    await models.Example.deleteMany();
    const data = await models.Example.find();
    assert.equal(data.length, 0, 'Examples were not deleted');
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

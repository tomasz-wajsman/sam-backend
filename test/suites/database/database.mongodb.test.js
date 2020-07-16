/* eslint-disable no-console */
const env = { ...process.env };

const assert = require('assert');
const expect = require('expect');

const MongooseClient = require('../../../clients/database/MongooseClient');

let imsConnection;
let imsUrl;
let mongooseClient;

const inMemoryServer = require('../../db/mongo');

describe('Mongoose connection tests', () => {
  beforeAll(async () => {
    try {
      // try connecting to the server
      imsUrl = await inMemoryServer.getConnectionString();
      imsConnection = await inMemoryServer.connect();
      mongooseClient = new MongooseClient(imsConnection);
    } catch (ex) {
      console.error(ex);
    }
  });
  test('Mongoose connection is correct', () => {
    assert.notEqual(mongooseClient.connection, null, 'Not connected to Mongo database');
    assert.equal(mongooseClient.isConnected, true, 'Not connected to Mongo database');
    assert.equal(imsConnection, mongooseClient.connection, 'Wrong connection specified');
  });
  test('Manual reconnecting', async () => {
    try {
      // disconnect
      await mongooseClient.disconnect();
      assert.equal(mongooseClient.isConnected, false, 'Connected to Mongo database');
      await mongooseClient.connect(imsUrl);
      assert.equal(mongooseClient.isConnected, true, 'Not connected to Mongo database');
    } catch (ex) {
      console.error(ex);
    }
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

const assert = require('assert');

const DatabaseServiceProvider = require('../../../clients/database/DatabaseServiceProvider');
const DatabaseClient = require('../../../clients/database/DatabaseClient');
const MongooseClient = require('../../../clients/database/MongooseClient');

const env = { ...process.env };

const settings = {};

describe('Provider tests', () => {
  test('Throws exceptions when using not implemented database provider', async () => {
    // set an incorrect provider
    const provider = new DatabaseServiceProvider('CustomProvider');
    // connecting
    await provider.client.connect()
      .catch(ex => {
        assert.equal(ex.message, 'Not implemented', 'The service is already implemented');
        assert.equal(provider.client instanceof DatabaseClient, true, 'The client was already set');
      });
    // disconnecting
    await provider.client.disconnect()
      .catch(ex => {
        assert.equal(ex.message, 'Not implemented', 'The service is already implemented');
        assert.equal(provider.client instanceof DatabaseClient, true, 'The client was already set');
      });
    // unmock environmental variables
    process.env = env;
  });
});

describe('Mongoose connection string conversion tests', () => {
  beforeAll(() => {
    // mock environmental variables
    settings.port = 1234;
    settings.databaseName = 'database';
    process.env.DATABASE_PROVIDER = 'mongoose';
    process.env.DATABASE_HOST = 'localhost';
    process.env.DATABASE_PORT = 1234;
    process.env.DATABASE_NAME = 'database';
  });
  test('Converts the connection string properly (no credentials)', () => {
    const url = `mongodb://localhost:${settings.port}/${settings.databaseName}`;
    assert.equal(MongooseClient.prepareConnectionString(), url, 'The connection string is not the same');
  });
  test('Converts the connection string properly (with credentails)', () => {
    // mock the username and password
    process.env.DATABASE_USERNAME = 'username';
    process.env.DATABASE_PASSWORD = 'password';
    const url = `mongodb://username:password@localhost:${settings.port}/${settings.databaseName}`;
    assert.equal(MongooseClient.prepareConnectionString(), url, 'The connection string is not the same');
    // unmock the data
    process.env = env;
  });
  afterAll(() => {
    // unmock the environmental variables
    process.env = env;
  });
});

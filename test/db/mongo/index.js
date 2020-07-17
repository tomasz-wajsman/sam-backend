/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mms = new MongoMemoryServer();

// in-memory database settings
const mmsOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  createIndexes: true
};

module.exports = {
  getConnectionDetails: async () => {
    const port = await mms.getPort();
    const databaseName = await mms.getDbName();
    return { port, databaseName };
  },
  // get connection string
  getConnectionString: async () => {
    const connectionString = await mms.getConnectionString();
    return connectionString;
  },
  // estabilishing the connection
  connect: async () => {
    const connectionString = await mms.getConnectionString();
    await mongoose.connect(connectionString, mmsOptions);
    return mongoose.connection;
  },
  // closing the connection
  disconnect: async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mms.stop();
  },
  // clearing the database
  clearDatabase: async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
  }
};

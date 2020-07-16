/* eslint-disable no-console */
const mongoose = require('mongoose');
const DatabaseClient = require('./DatabaseClient');

const config = require('../../config/database/mongoose.json');

class MongooseClient extends DatabaseClient {
  constructor(connection) {
    super();
    if (connection) {
      // passed a Mongoose connection object
      this.connection = connection;
      this.isConnected = true;
    }
    // add handlers
    mongoose.connection.on('open', () => {
      this.isConnected = true;
      console.info('Connected to MongoDB server');
    });
    mongoose.connection.on('disconnected', () => {
      this.isConnected = false;
      console.info('Disconnected from MongoDB server');
    });
    mongoose.connection.on('error', () => {
      console.error('Error during connecting to MongoDB server');
    });
  }

  static prepareConnectionString() {
    const url = `${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
    if (process.env.DATABASE_USERNAME && process.env.DATABASE_PASSWORD) {
      // credentials are given
      return `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${url}`;
    }
    // credentials are not given, use the default string
    return `mongodb://${url}`;
  }

  connect(url) {
    return new Promise((resolve, reject) => {
      mongoose.connect(url || MongooseClient.prepareConnectionString(), config)
        .then(() => {
          this.connection = mongoose.connection;
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      mongoose.disconnect()
        .then(() => {
          this.connection = null;
          resolve();
        })
        .catch(() => reject());
    });
  }
}

module.exports = MongooseClient;

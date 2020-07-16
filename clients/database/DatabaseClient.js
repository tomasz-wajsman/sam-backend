class DatabaseClient {
  constructor() {
    this.connection = null;
  }

  connect() {
    return new Promise((_resolve, reject) => {
      reject(new Error('Not implemented'));
    });
  }

  disconnect() {
    return new Promise((_resolve, reject) => {
      reject(new Error('Not implemented'));
    });
  }
}
module.exports = DatabaseClient;

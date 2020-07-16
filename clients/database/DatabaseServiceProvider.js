const DatabaseClient = require('./DatabaseClient');
const MongooseClient = require('./MongooseClient');

class DatabaseServiceProvider {
  constructor(providerName) {
    this.isConnected = false;
    const provider = providerName || process.env.DATABASE_PROVIDER;
    // check used database engine
    this.client = new DatabaseClient();
    switch (provider) {
      default: break;
      case 'mongoose':
        // use Mongoose (MongoDB)
        this.client = new MongooseClient();
        break;
    }
  }
}
module.exports = DatabaseServiceProvider;

const models = require('../database/mongo/models');

class ActivityManager {
  async getActivities() {
    let result = {};
    try {
      result = await models.Activity.find();
    } catch (e) {
      throw new Error('Could not get activities');
    }
    return result;
  }

  async getSingleActivity(activityID) {

  }

  async createActivity(activity) {

  }

  async updateActivity(activity) {

  }

  async deleteActivity(activityID) {

  }
}
module.exports = ActivityManager;

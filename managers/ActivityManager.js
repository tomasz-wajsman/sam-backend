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
    let result = {};
    try {
      result = await models.Activity.findById(activityID);
    } catch (e) {
      throw new Error('Could not get an activity');
    }
    return result;
  }

  async createActivity(activity) {
    let result = {};
    try {
      result = await models.Activity.create(activity);
    } catch (e) {
      throw new Error('Could not create an activity');
    }
    return result;
  }

  async updateActivity(activityID, details) {
    let result = {};
    try {
      result = await models.Activity.findByIdAndUpdate(
        activityID,
        details,
        { new: false }
      );
    } catch (e) {
      throw new Error('Could not update an activity');
    }
    return result;
  }

  async deleteActivity(activityID) {

  }
}
module.exports = ActivityManager;

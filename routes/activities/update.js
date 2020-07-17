const express = require('express');
const router = express.Router();

const managers = require('../../managers');

const util = require('../../util');

/* update an activity */

router.put(
  '/activities/:activityID',
  util.params.checkActivityID,
  util.params.checkActivityDetails,
  util.activityExistence.activityExists,
  async (req, res) => {
    let result = {};
    try {
      // get parameters
      const activityID = res.locals.activityID;
      const details = res.locals.activity;
      await managers.activities.updateActivity(activityID, details);
      res.status(204);
    } catch (e) {
      result = e.message;
      res.status(500);
    } finally {
      res.json(result);
    }
  }
);

module.exports = router;

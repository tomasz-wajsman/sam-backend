const express = require('express');
const router = express.Router();

const managers = require('../../managers');

const util = require('../../util');

/* delete an activity */

router.delete(
  '/activities/:activityID',
  util.params.checkActivityID,
  util.activityExistence.activityExists,
  async (req, res) => {
    let result = {};
    try {
      // get parameters
      const activityID = res.locals.activityID;
      await managers.activities.deleteActivity(activityID);
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

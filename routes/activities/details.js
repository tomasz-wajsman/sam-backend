const express = require('express');
const router = express.Router();

const managers = require('../../managers');

const util = require('../../util');

/* GET activity */

router.get(
  '/activities/:activityID',
  util.params.checkActivityID,
  async (req, res, next) => {
    let result = {};
    try {
      result = { activity: await managers.activities.getSingleActivity(res.locals.activityID) };
      res.status(200);
    } catch (e) {
      res.status(500);
    } finally {
      res.json(result);
    }
  }
);

module.exports = router;

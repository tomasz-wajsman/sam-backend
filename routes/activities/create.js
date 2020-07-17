const express = require('express');
const router = express.Router();

const managers = require('../../managers');

const util = require('../../util');

/* create an activity */

router.post(
  '/activities',
  util.params.checkActivityDetails,
  async (req, res) => {
    let result = {};
    try {
      // get parameters
      const activity = res.locals.activity;
      result = { activity: await managers.activities.createActivity(activity) };
      res.status(201);
    } catch (e) {
      res.status(500);
    } finally {
      res.json(result);
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();

const managers = require('../../managers');

/* GET activity */

const checkBody = (req, res, next) => {
  const params = req.params;
  // check if the request params contain the activity ID
  const regex = new RegExp(/([0-9a-f]){23}\w+/);
  const activityID = params.activityID;
  if (activityID && regex.test(activityID)) {
    res.locals.activityID = activityID;
    next();
  } else {
    res.status(400);
    res.json({ message: 'Incorrect activity ID' });
  }
};

router.get('/activities/:activityID', checkBody, async (req, res, next) => {
  let result = {};
  try {
    result = { activity: await managers.activities.getSingleActivity(res.locals.activityID) };
    res.status(200);
  } catch (e) {
    res.status(500);
  } finally {
    res.json(result);
  }
});

module.exports = router;

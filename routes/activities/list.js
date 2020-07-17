const express = require('express');
const router = express.Router();

const managers = require('../../managers');

/* GET activities */
router.get('/activities', async (req, res) => {
  let result = {};
  try {
    result = { activities: await managers.activities.getActivities() };
    res.status(200);
  } catch (e) {
    res.status(500);
  } finally {
    res.json(result);
  }
});

module.exports = router;

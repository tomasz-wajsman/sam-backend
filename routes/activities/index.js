const express = require('express');
const router = express.Router();

router.route('/activities')
  .get(require('./list'))
  .post(require('./create'));

router.route('/activities/:activityID')
  .get(require('./details'));

module.exports = router;

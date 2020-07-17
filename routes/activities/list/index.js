const express = require('express');
const router = express.Router();

router.route('/activities')
  .get(require('./list'));

module.exports = router;

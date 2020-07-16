const mongoose = require('mongoose');

const example = require('./schemas/example');
const Activity = require('./schemas/Activity');

module.exports = {
  Example: mongoose.model('example', example),
  Activity: mongoose.model('Activity', Activity)
};

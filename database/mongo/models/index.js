const mongoose = require('mongoose');

const example = require('./schemas/example');

module.exports = {
  Example: mongoose.model('POI', example)
};

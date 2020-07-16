const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: String,
  category: String,
  start_date: Number,
  end_date: Number,
  distance: Number
});

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  id: Number,
  userId: Number,
  date: Date,
  title: String,
  description: String
});

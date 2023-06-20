const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  gender: { type: String },
  age: { type: String },
  date: { type: String },
  country: { type: String },
});

module.exports = mongoose.model('users', userSchema);

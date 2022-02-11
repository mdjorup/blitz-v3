const mongoose = require('mongoose');

const WeekPicksSchema = new mongoose.Schema({
  _id: String,
  weekPicks: {
    type: Map,
    of: String
  }
});

const UserSchema = new mongoose.Schema({
  _id: String,
  displayName: String, 
  email: String,
  password: String,
  lastLoggedIn: Date,
  picks: [WeekPicksSchema],
});

module.exports = mongoose.model("user", UserSchema)


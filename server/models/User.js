const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: String,
  displayName: String, 
  email: String,
  password: String,
  lastLoggedIn: Date,
});

module.exports = mongoose.model("user", UserSchema)


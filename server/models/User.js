const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: String,
  displayName: String, 
  email: String,
  password: String
});

module.exports = mongoose.model("Users", UserSchema)


const User = require('../models/User')

const authRegister = (req, res) => {
  console.log("post request for register called");
  const user = new User({
    _id: req.body._id,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password
  });
  user.save()
      .then(data => {})
      .catch(err => {
        console.log(err);
      });
  console.log("successful register")
  
}
  

const authLogin = (req, res) => {
  console.log("post request for login called");
  
}

const authLogout = (req, res) => {
  console.log("post request for signout called");
  
}

module.exports = {
  authRegister,
  authLogin,
  authLogout,
}
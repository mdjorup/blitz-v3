const User = require('../models/User')

const authRegister = (req, res) => {
  console.log("post request for register called");
  const user = new User({
    _id: req.body._id,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
    lastLoggedIn: req.body.time,
  });
  user.save()
      .then(data => {
        return res.send({'message': "Successful register"})
      })
      .catch(err => {
        console.log(err);
        return res.send({"message": "Unsuccessful register"})
      });  
}
  
//req: _id, time
const authLogin = (req, res) => {
  User.findById(req.body._id)
    .then( async (user) => {
      user.lastLoggedIn = req.body.time;
      await user.save();
      return res.send({"message": "Successful login"})
    }).catch(err => {
      console.log(err)
      return res.send({"message": "Unsuccessful login"})
    })

  console.log("post request for login called");
  
}

module.exports = {
  authRegister,
  authLogin,
}
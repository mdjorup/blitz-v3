const authRegister = (req, res) => {
  console.log("post request for register called");

  
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
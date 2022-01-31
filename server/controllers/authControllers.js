const authRegister = (req, res) => {
  console.log("post request for register called");
  res.send({
    message: "successfully submitted post request",
    uid: 323840283940,
  })
}

const authLogin = (req, res) => {
  console.log("post request for register called");
}

const authLogout = (req, res) => {
  console.log("post request for register called");
}

module.exports = {
  authRegister,
  authLogin,
  authLogout,
}
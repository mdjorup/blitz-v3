const auth = require('../firebase.js').auth;
const createUserWithEmailAndPassword = require('firebase/auth').createUserWithEmailAndPassword;
const signInWithEmailAndPassword = require('firebase/auth').signInWithEmailAndPassword;
const signOut = require('firebase/auth').signOut;
// import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';


const authRegister = (req, res) => {
  console.log("post request for register called");
  //const body = JSON.parse(req.body)
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then( (userCredential) => {
      return res.status(201).send(
        {
          _id: userCredential.user.uid,
          email: req.body.email,
          password: req.body.password,
        }
      )
      //Here is where to add user to db
    }).catch((error) => {
      res.status(406).send({message: "Error registering user", code: error.code})
    })

}

const authLogin = (req, res) => {
  console.log("post request for login called");
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
  .then((userCredential) => {
    return res.status(202).send(
      {
        _id: userCredential.user.uid,
      }
    )
  }).catch((error) => {
    res.status(401).send({message: "Error login user", code: error.code})
  })
}

const authLogout = (req, res) => {
  console.log("post request for signout called");
  signOut(auth)
  .then((userCredential) => {
    return res.status(202).send({status: 'success'})
  }).catch((error) => {
    res.status(401).send({message: "Error signing out user", code: error.code})
  })
}

module.exports = {
  authRegister,
  authLogin,
  authLogout,
}
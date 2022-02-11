const dotenv = require('dotenv').config();

const axios = require('axios');

const User = require('../models/User')


const getPicks = (req, res) => {
  const uid = req.params.uid;
  const weekInfo = req.params.year + req.params.type + req.params.week;

  console.log("GET picks")

  User.findById(uid)
    .then(user => {
      const doc = user.picks.find(({_id}) => _id === weekInfo)
      if(doc) {
        return res.send(doc.weekPicks)
      } else {
        return res.send({});
      }
    }).catch(error => {
      console.log(error)
    })



}

const submitPicks = (req, res) => {
  const uid = req.params.uid;
  const weekInfo = req.params.year + req.params.type + req.params.week;

  console.log("POST to submit picks " + uid + " " + weekInfo)

  User.findById(uid)
    .then(async user => {

      const doc = user.picks.find(({_id}) => _id === weekInfo)
      if(doc) {
        doc.weekPicks = req.body
      } else {
        user.picks.push({
          _id: weekInfo,
          weekPicks: req.body
        })
      }

      await user.save();
    }).catch(error => {
      console.log(error)
    })


  res.send("success")



}

module.exports = {
  getPicks,
  submitPicks,
}
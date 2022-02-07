const dotenv = require('dotenv').config();

const axios = require('axios');

const url = `https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=${process.env.API_KEY}`

const getAllTeams = (req, res) => {
  console.log('get all teams called')

  axios.get(url)
    .then(response => {
      res.send(response)
    })
    .catch(error => {
      console.log(error);
    })
}
  
//req: _id, time
const getAllLogos = (req, res) => {
  console.log('get all logos called')

  axios.get(url)
    .then(response => {
      const result = response.data.map(({Key, FullName, WikipediaLogoUrl}) => ({Key, FullName, WikipediaLogoUrl}))
      res.send(result)
    })
    .catch(error => {
      console.log(error);
    })
  
}

module.exports = {
  getAllTeams,
  getAllLogos,
}
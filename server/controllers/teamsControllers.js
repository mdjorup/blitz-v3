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
      const result = {}
      response.data.forEach(element => {
        result[element.Key] = {
          'FullName': element.FullName,
          "PrimaryColor": element.PrimaryColor,
          "SecondaryColor": element.SecondaryColor,
          "TertiaryColor": element.TertiaryColor,
          "QuaternaryColor": element.QuaternaryColor,
          'Logo': element.WikipediaLogoUrl,
        }
      });
      //const result = response.data.map(({Key, FullName, WikipediaLogoUrl}) => ({Key, FullName, WikipediaLogoUrl}))
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
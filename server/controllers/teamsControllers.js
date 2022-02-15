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

const getStandings = (req, res) => {
  console.log("GET standings")
  const standingsUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Standings/2021?key=${process.env.API_KEY}`

  axios.get(standingsUrl)
    .then(response => {
      const data = response.data.filter(entry => entry.Team === req.params.team)
      res.send(data[0])
    }).catch(error => {
      console.log(error)
    })

}

const getSchedule = (req, res) => {
  console.log("GET schedule")
  const scheduleUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Scores/2021?key=${process.env.API_KEY}`

  axios.get(scheduleUrl)
    .then(response => {
      const data = response.data
        .filter(entry => entry.AwayTeam === req.params.team || entry.HomeTeam === req.params.team)
        .map(({GameKey, Week, Date, AwayTeam, HomeTeam, AwayScore, HomeScore, Quarter, TimeRemaining}) => ({GameKey, Week, Date, AwayTeam, HomeTeam, AwayScore, HomeScore, Quarter, TimeRemaining}))
      res.send(data)
    }).catch(error => {
      console.log(error)
    })
}

module.exports = {
  getAllTeams,
  getAllLogos,
  getStandings,
  getSchedule,
}
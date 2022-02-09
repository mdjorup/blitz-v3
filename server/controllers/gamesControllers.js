const dotenv = require('dotenv').config();

const axios = require('axios');

const getGamesByWeek = (req, res) => {
  const season = req.params.season;
  const type = req.params.type;
  const week = req.params.week;

  console.log(season + type + week)

  const url = `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${season}${type}/${week}?key=${process.env.API_KEY}`

  axios.get(url)
    .then(response => {
      console.log("Got response")
      //process data
      const data = response.data.map(({GameKey, Date, AwayTeam, HomeTeam, AwayScore, HomeScore, IsInProgress, IsOver, Quarter, TimeRemaining, Possession}) => 
      ({GameKey, Date, AwayTeam, HomeTeam, AwayScore, HomeScore, IsInProgress, IsOver, Quarter, TimeRemaining, Possession}))
      res.send(data)
    }).catch(error => {})

}

module.exports = {
  getGamesByWeek,
}
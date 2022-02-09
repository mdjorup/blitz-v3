const dotenv = require('dotenv').config();

const axios = require('axios');

const getGamesByWeek = (req, res) => {
  const season = req.params.season;
  const type = req.params.type;
  const week = req.params.week;
  
  const url = `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${season}${type}/${week}?key=${process.env.API_KEY}`

  axios.get(url)
    .then(response => {
      //process data
      console.log('GET request for current week games')
      const data = response.data.map(({GameKey, Date, AwayTeam, HomeTeam, AwayScore, HomeScore, IsInProgress, IsOver, Quarter, TimeRemaining, Possession}) => 
      ({GameKey, Date, AwayTeam, HomeTeam, AwayScore, HomeScore, IsInProgress, IsOver, Quarter, TimeRemaining, Possession}))
      res.send(data)
    }).catch(error => {})

}

module.exports = {
  getGamesByWeek,
}
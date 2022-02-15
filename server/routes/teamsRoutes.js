const express = require('express');
const teamsControllers = require('../controllers/teamsControllers.js')
const router = express.Router();


router.get('/', teamsControllers.getAllTeams );
router.get('/logos', teamsControllers.getAllLogos );
router.get('/standings/:year/:team', teamsControllers.getStandings)
router.get('/schedule/:year/:team', teamsControllers.getSchedule)


module.exports = router
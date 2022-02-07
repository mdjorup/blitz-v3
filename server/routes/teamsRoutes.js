const express = require('express');
const teamsControllers = require('../controllers/teamsControllers.js')
const router = express.Router();


router.get('/', teamsControllers.getAllTeams );
router.get('/logos', teamsControllers.getAllLogos );


module.exports = router
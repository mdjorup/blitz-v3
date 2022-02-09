const express = require('express')
const gamesControllers = require('../controllers/gamesControllers')
const router = express.Router();

router.get('/:season/:type/:week', gamesControllers.getGamesByWeek);

module.exports = router
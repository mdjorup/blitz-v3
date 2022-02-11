const express = require('express')
const picksControllers = require('../controllers/picksControllers.js')
const router = express.Router();

router.get('/:uid/:year/:type/:week', picksControllers.getPicks);
router.post('/:uid/:year/:type/:week', picksControllers.submitPicks);

module.exports = router
const express = require('express');
const authControllers = require('../controllers/authControllers.js')
const router = express.Router();


router.post('/register', authControllers.authRegister );
router.post('/login', authControllers.authLogin );


module.exports = router
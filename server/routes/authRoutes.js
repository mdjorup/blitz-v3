const express = require('express');
const authControllers = require('../controllers/authControllers.js')
const router = express.Router();


router.post('/register', authControllers.authRegister );
router.post('/login', authControllers.authLogin );
router.post('/logout', authControllers.authLogout );


module.exports = router
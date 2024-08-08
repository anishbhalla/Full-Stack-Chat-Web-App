const express = require('express');
const router = express.Router();
const {signup,login} = require('../controllers/auth.js')

router.post('/signup', signup);
router.post('/login', login); // Post routes because data has to be sent from front end to backend.

module.exports =  router;
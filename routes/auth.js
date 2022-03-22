const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
const loginAuth = require('../middlewares/auth.js');

router.post('/signup', auth.signup);

router.post('/login', auth.login);

router.get('/me', loginAuth, auth.me);

module.exports = router;
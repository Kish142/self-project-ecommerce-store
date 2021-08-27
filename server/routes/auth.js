const express = require('express');

const {
  register,
  login,
  logout,
  googleAuth,
  googleAuthCb,
} = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/google', googleAuth);

router.get('/google/redirect', googleAuthCb);

module.exports = router;

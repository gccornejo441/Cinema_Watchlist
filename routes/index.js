const express = require('express');
const { ensureAuthenticated } = require('../config/auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  res.render('home');
});

router.get('/homepage', ensureAuthenticated, (req, res, next) => {
  const username = req.user.username;

  res.render('home2', { user: username});
});

module.exports = router;

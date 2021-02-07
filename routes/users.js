var express = require('express');
var router = express.Router();

// User schema
const Users = require('../models/Users');

/* GET users listing. */
router.get('/signin', function(req, res, next) {
  console.log(req.body);
  res.render('signin')
});

router.get('/register', (req, res, next) => {
  console.log(req.body);
  res.render('register');
})

module.exports = router;

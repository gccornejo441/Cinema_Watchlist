const express = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

const router = express.Router();

// User schema
const Users = require('../models/Users');

// Hashing Information
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.get('/signin', (req, res, next) => {
  console.log('isAuthenticated: ', req.isAuthenticated());
  res.render('signin');
});

router.get('/signout', ensureAuthenticated, (req, res, next) => {
  req.logout();
  req.flash('logout', 'You are logged out')
  res.redirect('/');
});

router.get('/register', (req, res, next) => {
  console.log(req.body);
  res.render('register');
});

router.post('/register', (req, res, next) => {
  const { name, username, email, password } = req.body;
  const newUser = new Users({ name, username, email, password });

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, crypted) => {

      // Saving user to the DB
      newUser.password = crypted;
      newUser
        .save()
        .then((user) => {
          console.log('User Information: ', user);
          res.redirect('/users/signin');
        })
        .catch((err) => console.log(err));
    });
  });
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/users/signin',
    failureFlash: true
  })
);

module.exports = router;

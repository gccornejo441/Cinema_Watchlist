var express = require('express');

var router = express.Router();

// User schema
const Users = require('../models/Users');

// Hashing Information
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

/* GET users listing. */
router.get('/signin', (req, res, next) => {
  console.log(req.body);
  res.render('signin')
});

router.post('/signin', (req, res, next) => {
  console.log(req.body);
  res.render('signin')
});

router.get('/register', (req, res, next) => {
  console.log(req.body);
  res.render('register');
})

router.post('/register', (req, res, next) => {
  console.log(req.body);

    const { name, username, email, password } = req.body;
    const newUser = new Users({ name, username, email, password });
    

    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
      if (err) console.log(err);
      newUser.password = hash;
      newUser.save()
      .then((user) => {
        console.log('User Information: ', user);
        res.redirect('/users/register');
      })
    });
    
})

module.exports = router;

const express = require("express");
const passport = require('passport');

const router = express.Router();

// User schema
const Users = require("../models/Users");

// Hashing Information
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET users listing. */
router.get("/signin", (req, res, next) => {
  console.log(req.body);
  res.render("signin");
});

// router.post("/signin", (req, res, next) => {
//   console.log(req.body);

//   res.render("signin");
// });

router.get("/register", (req, res, next) => {
  console.log(req.body);
  res.render("register");
});

router.post("/register", (req, res, next) => {
  const { name, username, email, password } = req.body;
  const newUser = new Users({ name, username, email, password });

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) return next(err);

      newUser.password = hash;
      newUser
        .save()
        .then((user) => {
          console.log("User Information: ", user);
          res.redirect("/users/register");
        })
        .catch((err) => console.log(err));
    });
  });
});

router.post('/signin', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/users/signin',
 })
);


module.exports = router;

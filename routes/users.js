const express = require("express");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
const validator = require("email-validator");

const router = express.Router();

// User schema
const Users = require("../models/Users");

// Hashing Information
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/signin", (req, res, next) => {
  console.log("isAuthenticated: ", req.isAuthenticated());
  res.render("signin");
});

router.get("/signout", ensureAuthenticated, (req, res, next) => {
  req.logout();
  req.flash("logout", "You are logged out");
  res.redirect("/");
});

router.get("/register", (req, res, next) => {
  console.log(req.body);
  res.render("register");
});

router.post("/register", (req, res, next) => {
  const { name, username, email, password } = req.body;
  const error = [];

  if (name.length < 1 || name.length > 35) {
    return error.push(
      "Name must be greater than one but less than 35 characters."
    );
  } else {
    console.log(username);
    Users.findOne({ username: username }, (err, user) => {
      console.log(err);
      console.log(user);
      if (err == null && user == null) {
        const isEmail = Users.exists({ email: email });
        const emailValidator = validator.validate(email);

        if (!isEmail) {
          error.push("Email is not valid.");
          console.log(error);
          return res.redirect("/users/register");
        } else if (emailValidator != true) {
          error.push("Email is not valid.");
          console.log(error);
          return res.redirect("/users/register");
        } else if (password.length < 6) {
          error.push(
            "Not a secure password. A password of six characters or longer is acceptable."
          );
          console.log(error);
          return res.redirect("/users/register");
        } else {
          const newUser = new Users({ name, username, email, password });

          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, crypted) => {
              // Saving user to the DB
              newUser.password = crypted;
              newUser
                .save()
                .then((user) => {
                  console.log("User Information: ", user);
                  res.redirect("/users/signin");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      } else {
        error.push("Username is being used.");
        console.log(error);
        return res.redirect("/users/register");
      }
    });
  }
});

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/homepage",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);

module.exports = router;

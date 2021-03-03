const express = require("express");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
const validator = require("email-validator");

const router = express.Router();

// User schema
const Users = require("../models/userSchema");

// Hashing Information
const bcrypt = require("bcrypt");
const saltRounds = 10;

// GET signin
router.get("/signin", (req, res, next) => {
  console.log("isAuthenticated: ", req.isAuthenticated());
  res.render("signin");
});

// GET signout
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
  const { name, username, email, password, password2 } = req.body;
  const error = [];

  if (name.length < 1 || name.length > 35) {
    return error.push(
      "Name must be greater than one but less than 35 characters."
    );
  } else {
    Users.findOne({ username: username }, (err, user) => {
      if (err == null && user == null) {
        Users.findOne({ email: email }, (err, userEmail) => {
          if (err == null && userEmail == null) {
            const emailValidator = validator.validate(email);

            if (emailValidator != true) {
              error.push("Email is not valid.");
              req.flash("error", error);
              return res.redirect("/users/register");
            } else if (password.length < 6) {
              error.push(
                "Not a secure password. A password of six characters or longer is acceptable."
              );
              req.flash("error", error);
              return res.redirect("/users/register");
            } else {
              if (password !== password2) {
                error.push(
                  "Passwords do not match"
                );
                req.flash("error", error);
                return res.redirect("/users/register");
              } else {
                const newUser = new Users({ name, username, email, password, password2 });
  
                bcrypt.genSalt(saltRounds, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, crypted) => {
                    newUser.password = crypted;
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                      bcrypt.hash(newUser.password2, salt, (err, crypted) => {
                        newUser.password2 = crypted;
                        newUser
                          .save()
                          .then((user) => {
                            console.log("User Information: ", user);
                          })
                          .catch((err) => console.log(err));
                      });
                    });
                  });
                });
                res.redirect("/users/signin");
              }
            }
          } else {
            error.push("Email already in use.");
            req.flash("error", error);
            return res.redirect("/users/register");
          }
        });
      } else {
        error.push("Username is being used.");
        req.flash("error", error);
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

router.get('/settings', ensureAuthenticated, (req, res, next) => {
  res.render('settings', { user: req.user.username, name: req.user.name });
})

module.exports = router;

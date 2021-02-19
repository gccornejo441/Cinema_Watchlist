const express = require("express");
const bodyParser = require("body-parser");
const { ensureAuthenticated } = require("../config/auth");
const MongoClient = require('mongodb').MongoClient;

// Mongo Information
const url = 'mongodb://localhost:27017';
const dbName = 'chapters';

const dashRouter = express.Router();

dashRouter.use(bodyParser.urlencoded({ extended: false }));
dashRouter.use(bodyParser.json());

const Users = require("../models/userSchema");
// const Movies = require("../models/movieSchema");

// GET root
dashRouter.get("/", ensureAuthenticated, (req, res, next) => {
  Users.findOne({ _id: req.user._id }, (err, user) => {
    const result = user.submittedMovies;
    console.log(result);
    if (result && result.length) {
      if (user != null) {
        res.render("dashboard", { result: result });
      } else {
        err = new Error("Movie " + req.user._id + " not found");
        res.send("hello");
      }
    } else {
      err = new Error("Movie " + req.user._id + " not found");
      res.render("dashboard", { result: result });
    }
  });
});

// POST delete
dashRouter.post("/delete/:id", ensureAuthenticated, (req, res, next) => {
  Users.findOne({ _id: req.user._id }, (err, user) => {
    const result = user.submittedMovies;
    if (result && result.length) {
      if (user != null) {
        
        for (let i = 0; i < result.length; i++) {
          if (result[i]._id == req.params.id) {
            result.id(req.params.id).remove();
          }
        }
        user.save()
        .then(() => {
          res.redirect("/dashboard");
        })
      }
    }
  }).catch((err) => next(err))
});

// GET edit
dashRouter.get("/edit/:id", ensureAuthenticated, (req, res, next) => {
  Movies.findById(req.params.id, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.render("edit", { result: result });
  }).catch((err) => next(err));
});

// POST edit
dashRouter.post("/edit/:id", ensureAuthenticated, (req, res, next) => {
  Movies.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    if (err) console.log(err);
    console.log("Document to be updated: ", doc);
    res.redirect("/dashboard");
  }).catch((err) => {
    if (err) {
      if (err.name == "ValidationError") {
        for (field in err.errors) {
          console.log(err.errors[field].message);
          req.flash("error", err.errors[field].message);
        }
      }
    }
    console.log("Error: ", err);
    res.redirect("/new-movie");
  });
});

module.exports = dashRouter;

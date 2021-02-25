const express = require("express");
const bodyParser = require("body-parser");
const { ensureAuthenticated } = require("../config/auth");


const dashRouter = express.Router();

dashRouter.use(bodyParser.urlencoded({ extended: false }));
dashRouter.use(bodyParser.json());

const Users = require("../models/userSchema");

// GET root
dashRouter.get("/", ensureAuthenticated, (req, res, next) => {
  Users.findOne({ _id: req.user._id }, (err, user) => {
    const result = user.submittedMovies;
    if (result && result.length) {
      if (user != null) {
        res.render("dashboard", { result: result, user: req.user.username });
      } else {
        err = new Error("Movie " + req.user._id + " not found");
        next(err);
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
        user.save().then(() => {
          res.redirect("/dashboard");
        });
      }
    }
  }).catch((err) => next(err));
});

// GET edit
dashRouter.get("/edit/:id", ensureAuthenticated, (req, res, next) => {
  Users.findById(req.user._id, (err, user) => {
    if (err) new Error(err);
    const result = user.submittedMovies;
    console.log(result.id(req.params.id));
    if (result && result.length) {
      if (user != null) {
        for (let i = 0; i < result.length; i++) {
          if (result[i]._id == req.params.id) {
            res.render("edit", { result: result.id(req.params.id), user: req.user.username });
          }
        }
      }
    }
  }).catch((err) => next(err));
});

// POST edit
dashRouter.post("/edit/:id", ensureAuthenticated, (req, res, next) => {
  Users.findByIdAndUpdate(req.user._id, { $set: { submittedMovies: req.body }}, {new: true}, (err, doc) => {
    if (err) console.log(err);
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
  });
});

dashRouter.get("/reviews", (req, res, next) => {
  Users.findOne({ _id: req.user._id }, (err, user) => {
    const result = user.submittedMovies;
    if (result && result.length) {
      if (user != null) {
        res.render("reviews", { result: result, user: req.user.username });
      } else {
        err = new Error("Movie " + req.user._id + " not found");
        next(err);
      }
    } else {
      err = new Error("Movie " + req.user._id + " not found");
      res.render("reviews", { result: result });
    }
  });
})

module.exports = dashRouter;

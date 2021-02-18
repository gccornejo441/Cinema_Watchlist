const express = require("express");
const bodyParser = require("body-parser");
const { ensureAuthenticated } = require("../config/auth");

const dashRouter = express.Router();

dashRouter.use(bodyParser.urlencoded({ extended: false }));
dashRouter.use(bodyParser.json());

const Movies = require("../models/movieSchema");

dashRouter.get("/", ensureAuthenticated, (req, res, next) => {
  Movies.find({}, (err, result) => {
    if (err) new Error(err);
    res.render("dashboard", { result: result });
  }).catch((err) => next(err));
});


dashRouter.post("/delete/:id", ensureAuthenticated, (req, res, next) => {
  Movies.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
    console.log(doc);
    if (!err) {
      res.redirect("/dashboard");
    } else {
      console.log("Error in movie data: " + err);
    }
  });
});

// GET /dashboard/edit/_id
dashRouter.get("/edit/:id", ensureAuthenticated, (req, res, next) => {
  console.log("Movie Id: ", req.params.id);
  console.log("Body info: ", req.body);
  Movies.findById(req.params.id, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.render("edit", { result: result });
  }).catch((err) => next(err));
});

dashRouter.post("/edit/:id", ensureAuthenticated, (req, res, next) => {
  console.log("Movie Id: ", req.params.id);
  console.log("Body info: ", req.body);
  Movies.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    if (err) throw handleError(err);
    console.log('Document to be updated: ', doc)
    res.redirect("/dashboard");
  }).catch((err) => next(err))
});

module.exports = dashRouter;

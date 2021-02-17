const express = require("express");
const bodyParser = require("body-parser");
const { ensureAuthenticated } = require("../config/auth");

const dashRouter = express.Router();

dashRouter.use(bodyParser.urlencoded({ extended: false }));
dashRouter.use(bodyParser.json());

const Movies = require("../models/movieSchema");

dashRouter.get("/", ensureAuthenticated, (req, res, next) => {
  Movies.find({}, (err, result) => {
    res.render("dashboard", { result: result });
  }).catch((err) => next(err));
});

dashRouter.get("/delete/:id", ensureAuthenticated, (req, res, next) => {
  Movies.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
    console.log(doc);
    if (!err) {
      res.redirect("/dashboard");
    } else {
      console.log("Error in movie data: " + err);
    }
  });
});

dashRouter.post("/edit/:id", ensureAuthenticated, (req, res, next) => {
  console.log("Movie Id: ", req.params.id);
  console.log("Body info: ", req.body);

  Movies.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    if (err) throw handleError(err);
    res.redirect("/dashboard");
  });
});

module.exports = dashRouter;

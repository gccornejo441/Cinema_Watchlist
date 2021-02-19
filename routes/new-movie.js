const express = require("express");
const bodyParser = require("body-parser");
const { ensureAuthenticated } = require("../config/auth");

const Users = require("../models/userSchema");

const newMovieRouter = express.Router();

newMovieRouter.use(bodyParser.urlencoded({ extended: false }));
newMovieRouter.use(bodyParser.json());

newMovieRouter.post("/:userId", (req, res, next) => {
  console.log(req.params.userId)
  Users.findOne({ _id: req.params.userId}, (err, user) => {
    if (user != null) {
      user.submittedMovies.push(req.body);
      user.save()
      .then((err, movie) => {
        if (err) console.log(err);
        console.log("Movie Information: ", movie);
        res.redirect("/another-movie");
      })
      .catch((err) => {
        if (err) {
          if (err.name == "ValidationError") {
            for (field in err.errors) {
              console.log(err.errors[field].message);
              req.flash("error", err.errors[field].message);
            }
          }
        }
        res.redirect("/new-movie");
      })
    } else {
      err = new Error('Movie ' + req.params.userId + ' not found');
      req.flash("error", err);
      res.render("new-movie");
    }
  })
})

newMovieRouter.get("/", ensureAuthenticated, (req, res, next) => {
  const userId = req.user._id;

  res.render("new-movie", { userId: userId });
});

module.exports = newMovieRouter;

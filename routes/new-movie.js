const express = require("express");
const bodyParser = require("body-parser");
const { ensureAuthenticated } = require('../config/auth');

const Movies = require("../models/movieSchema");

const newMovieRouter = express.Router();

newMovieRouter.use(bodyParser.urlencoded({ extended: false }));
newMovieRouter.use(bodyParser.json());

newMovieRouter.post('/', (req, res, next) => {

  const newMovie = new Movies(req.body);

  newMovie.save()
  .then((movie) => {
    console.log('Movie Information: ', movie);
    res.redirect('/another-movie');
  }).catch((err) => {
    if (err) {
      if (err.name == 'ValidationError') {
          for (field in err.errors) {
              console.log(err.errors[field].message);
              req.flash('error', err.errors[field].message);
          }
      }
    }
      res.redirect('/new-movie');
  });
})

newMovieRouter.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('new-movie');
})

module.exports = newMovieRouter;

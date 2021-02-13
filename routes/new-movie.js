const express = require("express");
const bodyParser = require("body-parser");
const { ensureAuthenticated } = require('../config/auth');

const Movies = require("../models/movieSchema");

// Router Name
const newMovieRouter = express.Router();


newMovieRouter.use(bodyParser.urlencoded({ extended: false }));
newMovieRouter.use(bodyParser.json());

newMovieRouter.post('/', (req, res, next) => {

  const { genre, title, director, releaseDate, producer, rating} = req.body;
  const newMovie = new Movies({ genre, title, director, releaseDate, producer, rating });

  newMovie.save()
  .then((movie) => {
    console.log('Movie Information: ', movie);
    res.redirect('/another-movie');
  }).catch((err) => {
      console.log(err);
      res.redirect('/new-movie');
  });
})

newMovieRouter.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('new-movie');
})


module.exports = newMovieRouter;

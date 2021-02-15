const express = require('express');
const { ensureAuthenticated } = require('../config/auth');

const dashRouter = express.Router();
const Movies = require('../models/movieSchema');
const Users = require('../models/Users');

dashRouter.get('/', ensureAuthenticated, (req, res, next) => {
  Movies.find({}, (err, result) => {
    res.render('dashboard', { result: result });
  })
  .catch(err => next(err));
})

dashRouter.post('/delete', ensureAuthenticated, (req, res, next) => {
  console.log('You clicked?')
  console.log(req.body);
  res.redirect('/dashboard')
})

// dashRouter.get('/',  (req, res, next) => {
//   Movies.find({}).populate('submittedMovies').exec((err, movies) => {
//     console.log(movies)
//     res.end();
//   });
// })

module.exports = dashRouter;


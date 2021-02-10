const express = require('express');
const { ensureAuthenticated } = require('../config/auth');

const dashRouter = express.Router();
const Movies = require('../models/movieSchema');

dashRouter.get('/', ensureAuthenticated, (req, res, next) => {
  Movies.find({}, (err, result) => {
    res.render('dashboard', { result: result });
  })
  .catch(err => next(err));
})

module.exports = dashRouter;


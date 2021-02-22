const express = require('express');
const anotherRouter = express.Router();
const { ensureAuthenticated } = require("../config/auth");

// GET another-movie
anotherRouter.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('another-movie', { user: req.user.username });
})

module.exports = anotherRouter;

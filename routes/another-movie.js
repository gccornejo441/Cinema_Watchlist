const express = require('express');
const anotherRouter = express.Router();

// GET another-movie
anotherRouter.get('/', (req, res, next) => {
  res.render('another-movie');
})

module.exports = anotherRouter;

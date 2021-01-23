const express = require('express');
const path = require('path');


const dashRouter = express.Router();

/* GET dashboard page. */
dashRouter.get('/', (req, res, next) => {
  res.render('dashboard');
});

module.exports = dashRouter;

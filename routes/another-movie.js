const express = require('express');
const anotherRouter = express.Router();

/* GET another-movie page. */
anotherRouter.get('/', (req, res, next) => {
  res.render('another-movie');
})


module.exports = anotherRouter;

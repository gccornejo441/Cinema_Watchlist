const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const anotherRouter = express.Router();


const Movies = require("../models/movieSchema");


const url = "mongodb://localhost:27017/chapters";

// Back to create-a-home
const resubmit = path.join(__dirname, '../public', 'new-movie.html');

anotherRouter.use(bodyParser.urlencoded({ extended: false }));
anotherRouter.use(bodyParser.json());

/* GET another-movie page. */
anotherRouter.post("/", function (req, res, next) {
    // Schema instance
    const movieDoc = new Movies(req.body);

    movieDoc.save()
    .then(() => {
        res.render('another-movie')
    }).catch((err) => {
        res.status(400).send(
            `Validation error: ${err._message} <html><body><a href="/views/new-movie">return</a></body></html>`
          );
        res.end();
        console.log(err);
      });

});

module.exports = anotherRouter;

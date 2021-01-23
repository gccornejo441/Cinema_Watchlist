const express = require("express");
const movieRouter = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const mongoose = require("mongoose");


const Movies = require("../models/movieSchema");


Movies.createCollection()
.then((collection) => {
  console.log('Movie collection created!');
});

const url = "mongodb://localhost:27017/chapters";

movieRouter.use(bodyParser.urlencoded({ extended: false }));
movieRouter.use(bodyParser.json());
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    movieRouter.route("/")
    .get((req, res, next) => {
      res.statusCode = 200;
      res.render('new-movie')
    })
});

module.exports = movieRouter;

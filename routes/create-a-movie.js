const express = require("express");
const bookRouter = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const mongoose = require("mongoose");


const Movies = require("../models/movieSchema");

const url = "mongodb://localhost:27017/chapters";

const dbName = "chapters";

bookRouter.use(bodyParser.urlencoded({ extended: false }));
bookRouter.use(bodyParser.json());
bookRouter.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    bookRouter.route("/")
    .get((req, res, next) => {
      res.statusCode = 200;
      res.sendFile(path.join(__dirname, '../public', 'new-movie.html'))
    })
    .post((req, res, next) => {
        // Document
        Books.create(req.body);
        res.sendFile(path.join(__dirname, '../public', 'another-movie.html'));
      });
    
    bookRouter.route("/another-book")
    .get((req, res, next) => {
      res.statusCode = 200;
      res.sendFile(path.join(__dirname, '../public', 'another-movie.html'));
    });
});


// MongoClient.connect(url, (err, client) => {
//   // Admin database for the operation

//   // route to title

//   bookRouter.route("/:title").get((req, res, next) => {
//     coll.find({}).toArray((err, docs) => {
//       if (docs != null) {
//         for (let i = 0; i < docs.length; i++) {
//           if (docs[i].title == req.params.title) {
//             console.log("We found: " + docs[i].title.toLowerCase());
//             res.sendFile(path.join(__dirname + `/${docs[i].title}.html`));
//             // res.end(`<html><body><h1>${docs[i].title}</h1></body></html>`);
//           }
//         }
//       } else {
//         err = Error("Title Not Found");
//         next(err);
//       };
//     });
//   });
// });

module.exports = bookRouter;

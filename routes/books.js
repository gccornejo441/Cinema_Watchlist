const express = require("express");
const bookRouter = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const test = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "chapters";

bookRouter.use(bodyParser.urlencoded({ extended: false }));
bookRouter.use(bodyParser.json());
bookRouter.use(cors());

MongoClient.connect(url, (err, client) => {
  // Admin database for the operation
  const coll = client.db(dbName).collection("books");

  bookRouter.route("/")
    .get((req, res, next) => {
      res.sendFile(path.join(__dirname + "/new-book.html"));
    })
    .post((req, res, next) => {
    // Document
      const book = req.body;
      console.log(book);

      coll.insert(book, {w:1}, (err, result) => {
          test.equal(null, err);

          dbName.listCollections().toArray((err, items) => {
              test.equal(null, err);
              client.close();
          });
      });
      
      res.send("Book is added to the database");
    });
});

module.exports = bookRouter;

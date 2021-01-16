const express = require("express");
const bookRouter = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

const dbName = "chapters";

bookRouter.use(bodyParser.urlencoded({ extended: false }));
bookRouter.use(bodyParser.json());

MongoClient.connect(url, (err, client) => {
  // Admin database for the operation
  const coll = client.db(dbName).collection("books");

  bookRouter
    .route("/")
    .get((req, res, next) => {
      res.sendFile(path.join(__dirname + "/new-book.html"));
    })
    .post((req, res, next) => {
      // Document
      const book = req.body;
      console.log(book);

      coll.insert(book, { w: 1 }, (err, result) => {
        assert.equal(null, err);

        dbName.listCollections().toArray((err, items) => {
          assert.equal(null, err);
          client.close();
        });
      });

      res.send("Book is added to the database");
    })
    .delete((req, res, next) => {
      coll.remove();
      assert.equal(null, err);
      assert.equal(0, items.length);
      db.close();
    });

  // route to title

  bookRouter.route("/:title")
  .get((req, res, next) => {
    coll.find({}).toArray((err, docs) => {
        if (!err) {
            for (let i = 0; i < docs.length; i++) {
              if (docs[i].title == req.params.title) {
                console.log("We found: " + docs[i].title);
                res.sendFile(path.join(__dirname + `/${docs[i].title}.html`));
                // res.end(`<html><body><h1>${docs[i].title}</h1></body></html>`);
              }
            }
          }
        })
  });
});

module.exports = bookRouter;

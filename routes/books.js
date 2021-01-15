const express = require('express');
const bookRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

bookRouter.use(bodyParser.urlencoded({ extended: false }));
bookRouter.use(bodyParser.json());

// Where we will keep books
let books = [];

bookRouter.use(cors());

bookRouter.route('/')
.get((req, res, next) => {
    res.sendFile(path.join(__dirname + '/new-book.html'));
})
.post((req, res, next) => {
    const book = req.body;

    console.log(book);
    books.push(book)
    
    res.send('Book is added to the database');
})

module.exports = bookRouter;
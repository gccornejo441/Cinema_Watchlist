const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const assert = require('assert');

const dashRouter = express.Router();

// User schema
const Users = require('../models/Users');

const url = 'mongodb://localhost:27017';
const dbname = 'chapters';

MongoClient.connect(url, (err, client) => {
  
  if(err) throw err;

  const collection = client.db(dbname).collection('movies');
  collection.find({}).toArray()
  .then((result) => {
      dashRouter.get('/', (req, res, next) => {
       console.log('Document Found: ', result);
       res.render('dashboard', { result: result });
    });

  })
  .catch((err) => next(err));
});


module.exports = dashRouter;

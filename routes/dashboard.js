const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const path = require('path');
const dashRouter = express.Router();
const assert = require('assert');


const url = 'mongodb://localhost:27017';
const dbname = 'chapters';


// MongoClient.connect(url, (err, client) => {
//   const collection = client.db(dbname).collection('movies');

//     collection.findOne({}, (err, result) => {
//       if (err) throw err;
//       dashRouter.get('/', (req, res, next) => {
//         res.render('dashboard', {result})
//       })
//     })
    

//     console.log(err);

    

// })

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

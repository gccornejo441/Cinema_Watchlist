const express = require('express');
const bodyParser = require('body-parser');

const anotherRouter = express.Router();


const Movies = require('../models/movieSchema');


anotherRouter.use(bodyParser.urlencoded({ extended: false }));
anotherRouter.use(bodyParser.json());

/* GET another-movie page. */
// anotherRouter.post('/', (req, res, next) => {
//       // Schema instance
//       const movieDoc = new Movies(req.body);
  
//       movieDoc.save()
//       .then(() => {
//           res.render('another-movie')
//       }).catch((err) => {
//           res.status(400).send(
//               `Validation error: ${err._message} <html><body><a href="/views/new-movie">return</a></body></html>`
//             );
//           res.end();
//           console.log(err);
//         });

// });

anotherRouter.get('/', (req, res, next) => {
  res.render('another-movie');
})


module.exports = anotherRouter;

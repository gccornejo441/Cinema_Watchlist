

const express = require('express');
const path = require('path');


const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile(path.join(__dirname, '../public', 'home.html'));

  ejs.renderFile('pages/sample', function(err, str){
    // str => Rendered HTML string
});
});

module.exports = router;

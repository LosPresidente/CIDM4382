var express = require('express');
var router = express.Router();

var arg = {
  title: 'Ian from czechia',
  color: "Blue"
};

var renderfunc = function(req, res, next){
  res.render('index', arg);
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', arg );
});

router.get('/', renderfunc);

module.exports = router;

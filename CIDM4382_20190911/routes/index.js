var express = require('express');
var router = express.Router();

/* GET home page. */
//req=request, res=respond sorta like get set, next=middleware
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

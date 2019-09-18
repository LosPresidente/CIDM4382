var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET color page
router.get('/color/', (req, res, next) => {

var colors = ["red","green","blue"];
var color = colors[Math.floor(Math.random()*colors.length)];

  res.render('color', 
  {
     title: 'Random color',
     color: color
    })
});

module.exports = router;

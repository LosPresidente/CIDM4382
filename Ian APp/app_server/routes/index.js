var express = require('express');
var router = express.Router();

//this is like what is in the database - same kind of record, only the DB has 40+ fields
const client = {
  ID: 100,
  name: "dude",
  role: "pilot"
};

//this is array of clients like crew members
const client = [
  {
    ID: 100,
    name: "dude",
    role: "pilot"
  },
  {
    ID: 100,
    name: "dude",
    role: "pilot"
  },
  {
    ID: 100,
    name: "dude",
    role: "pilot"
  },
  {
    ID: 100,
    name: "dude",
    role: "pilot"
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//This one just prints the sentence 3 lines below. This is called an endpoint  http://localhost:3000/api/one
router.get('/api/one', function(req, res, next){
  //what do we do here
  res.send(`${client.name} is a ${client.role}`);
})

//this straight up prints out the record names and values. http://localhost:3000/api/json/one
router.get('/api/json/one', function(req, res, next){
  //what do we do here
  res.json(client);
})

module.exports = router;
const express = require('express');
const router = express.Router();
const ctrlWeather = require('../controllers/weather');

// vatsim
router
  //based on https://flightaware.com/commercial/flightxml/explorer/#op_Departed
  
  // the airport howmany and offset corresponds with vatsim.js line 54
  .route('/all')
  .get(ctrlWeather.all);
  // .get(ctrlWeather.testVar);

module.exports = router;
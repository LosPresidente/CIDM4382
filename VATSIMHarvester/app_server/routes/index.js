var express = require('express');
var router = express.Router();
const ctrlVatsim = require('../controllers/vatsim');
//const ctrlWeather = require('../../app_api/controllers/weather');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '[weather application]' });
});

/* doing departures the client-side (Angular) way */
// router.get('/departures', function(req, res, next) {
//   res.render('departures', { title: 'ZAB Depatures' });
// });

// /* doing arrivals the server-side (Express and Pug) way */
// //this passes data into the PUG page
// router.get('/arrivals', ctrlVatsim.vatsimArrivals);
// router.post('/arrivals', ctrlVatsim.vatsimAirportSelection);

router
  
  // the airport howmany and offset corresponds with vatsim.js line 54
  // .route('/all')
  router.get('/all', ctrlVatsim.all);
  //router.post(ctrlWeather.all);


// router.get('/api/all', ctrlWeather.all);
// router.post('/all', ctrlWeather.all);

router.get('/vatsim', ctrlVatsim.prague);

module.exports = router;

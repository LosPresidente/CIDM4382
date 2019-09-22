const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');
const ctrlMain = require('../controllers/others');

//const homepageController = (req, res) => {res.render('index', { title: 'Express'})};

//location pages
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

//other pages

router.get('/about', ctrlOthers.about);

router.get('/', ctrlMain.index);

module.exports = router;

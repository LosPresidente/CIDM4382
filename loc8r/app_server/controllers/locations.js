//home page
const homelist = (req,res) => {res.render('index', { title:'Home'})};

//location page
const locationinfo = (req,res) => {res.render('index', { title:'Location Info'})};

//review page
const addReview = (req,res) => {res.render('index', { title:'Add Review'})};

module.exports = {
    homelist,
    locationinfo,
    addReview
};
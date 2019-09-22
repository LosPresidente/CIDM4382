//GET about page
const about = (req, res) => {res.render('generic-text', {title: 'About'})};
const pizza = (req, res) => {res.render('pizza', {title: 'Pizza Places'})};
module.exports = {
    about,
    pizza
};


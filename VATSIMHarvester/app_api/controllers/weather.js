const mongoose = require('mongoose');
// const Client = mongoose.model('Client');
const Weather = mongoose.model('Weather');

const testVar = (req, res) =>{

    const testData =[
        "test uspesny",
        "miro je pes",
        "gulas vari gulas",
    ];
    res.render(testData);

} 


const all = (req, res) => {
    
    //this line looks for entries where the field summary is Clear [tablename].find({[lookup conditions]});
    Weather.find({
        summary: 'Clear',
    },
        //callback
        (err, docs) => {
            //send records back
            console.log("docs" + docs.summary)
            if(!err){
                res.send(docs);
                
            }else{
                res.send(err);
                console.log(err);
            }
        }
    );    
}

module.exports = {
    all,
    testVar,
};
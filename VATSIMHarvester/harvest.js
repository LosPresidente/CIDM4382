const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


//should be /app_api/models/[weather]
require('./app_api/models/vatsim');
const Weather = mongoose.model('Weather');


const task = cron.schedule('* * * * *', () => {

        // console.log(response.data.currently.time);
        // console.log(response.data.currently.summary);
        // console.log(response.data.currently.precipProbability);
        // console.log(response.data.currently.temperature);
        // console.log(response.data.currently.windSpeed);
    //DarkSkyAPI call to Prague: https://api.darksky.net/forecast/365be2e4f1f9ae0fb3d3b2dbbf6ff9a4/50.0755,14.4378
    //Babb's website: http://us.data.vatsim.net/vatsim-data.txt


    
   axios.get('https://api.darksky.net/forecast/365be2e4f1f9ae0fb3d3b2dbbf6ff9a4/50.0755,14.4378')
    .then( (response) => {

        console.log("Weather data written to the database"); //this line lets me know that the app got some data from the api
        let ds_time = response.data.currently.time;
        let ds_summary = response.data.currently.summary;
        let ds_rain = response.data.currently.precipProbability;
        let ds_temp = response.data.currently.temperature;
        let ds_wind = response.data.currently.windSpeed;

        // time: int,
        // summary: string,
        // precipProbability: float,
        // temperature: float,
        // windSpeed: float

        var report = {
            time: ds_time,
            summary: ds_summary,
            rain: ds_rain,
            temp: ds_temp,
            wind: ds_wind
        }

        //pull connection string from environment variable
        const uri = process.env.MONGODB_ATLAS_URL;

        //this example uses ES6 template literals for string interpolation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
                .catch(err => console.log(err));
    
        //insert the most recent list - https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
        // var promise = Client.insertMany(client_list, (err, docs) => {
        //     if(!err){
        //         console.log(`INSERTED: ${client_list.length} records`);
        //     }else{
        //         console.log(err);
        //     }
        // });

        
       var promise = Weather.create(report, function (err, small) {
            if (err) return handleError(err);
            // saved!
        });

    })
    .catch( (error) => {
        console.log(error);
    });

    },{
        scheduled: false
    }
);

module.exports = task;
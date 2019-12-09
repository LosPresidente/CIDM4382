const request = require('request');
const selected_port = process.env.PORT || '3000';
let port_to_use = process.env.post || '5000';
let host_to_use = process.env.host || "localhost";
let server_to_use = 'http://localhost:' + port_to_use;

//this port may have to be changed in order for this to work 

const apiOptions = {
  server: server_to_use,
};

// const apiOptions = {
//   server: 'http://localhost:' + port_to_use
// };

//this is the arrivals page
const Airports = [
    //BRAVO
    "KPHX", //KPHX - Phoenix Sky Harbor Intl
    "PRAGUE",
    //CHARLIE
    // "KABQ", //KABQ - Albuquerque Intl Sunport
    // "KAMA", //KAMA - Rick Husband Amarillo Intl
    // "KDMA", //KDMA - Davis Monthan AFB
    // "KELP", //KELP - El Paso Intl
    // "KTUS", //KTUS - Tucson Intl & U90 TRACON
    // //DELTA
    // "KAEG", //KAEG - Double Eagle II
    // "KBIF", //KBIF - Biggs AAF
    // "KCHD", //KCHD - Chandler Municipal
    // "KCVS", //KCVS - Cannon AFB
    // "KDVT", //KDVT - Phoenix Deer Valley
    // "KFFZ", //KFFZ - Falcon Field
    // "KFHU", //KFHU - Sierra Vista / Libby AAF
    // "KFLG", //KFLG - Flagstaff Pulliam
    // "KGEU", //KGEU - Glendale Municipal
    // "KGYR", //KGYR - Phoenix Goodyear
    // "KHMN", //KHMN - Holloman AFB
    // "KIWA", //KIWA - Phoenix-Mesa Gateway
    // "KLUF", //KLUF - Luke AFB
    // "KPRC", //KPRC - Ernest A Love Field
    // "KROW", //KROW - Roswell Intl Air Center
    // "KRYN", //KRYN - Ryan Field
    // "KSAF", //KSAF - Santa Fe Municipal
    // "KSDL"  //KSDL - Scottsdale
  ];


// Airports.forEach((airport) => {
//     console.log(airport);
// })

//this will be first selected airport - let coz it can change
//let selectedAirport = "KPHX";

const all = (req, res, next) => {
  res.render('all', {});
}

const renderPraguePage = (req, res, responseBody) => {
  console.log("infor here" + responseBody);
  res.render('vatsim', { 
    title: 'Prague weather',
    forecasts: responseBody
  });

}


const prague = (req, res, next) => {

  const path = `/api/all`;
  // const path = `/vatsim`;

  const requestOptions = {
    // url: `${apiOptions.server}${path}`
    url: 'http://localhost:3000/api/all',
    method: 'GET',
    json: {},
  };
  request(
    requestOptions,
//if you get error here just change the port above to 5000
  (err, { statusCode }, body) => {
      // let data = []; //this checks if the request was successfull and that there are records passed here
      // if (statusCode === 200 && body.length) {//this checks that the page responded well (200) and the there is something in the body
      //     data = body;
      // }//this passes the info into the page
      console.log("WHAT AM I RECEIVING" + body.summary)
      renderPraguePage(req, res, body);
      
    }
  );

let selectedAirport = "KPHX";
//post method - this method changes what is displayed on the page (i think)
const vatsimAirportSelection = (req, res) => {
  //this helps with the dropdown
    console.log(req.body);
    selectedAirport = req.body.selectedAirport;
    console.log(`Selected Airport: ${selectedAirport}`);
    vatsimArrivals(req, res);
}

const vatsimArrivals = (req, res) => {
    // /arrived/:airport/:howMany/:offset
    console.log(`Selected Airport: ${selectedAirport}`);

    const path = `/api/arrived/${selectedAirport}/15/0`;

    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {},
    };
    request(
      requestOptions,
//(err, {statusCode}, body)
(err, {statusCode}, body) => {
        let data = []; //this checks if the request was successfull and that there are records passed here
        if (statusCode === 200 && body.length) {//this checks that the page responded well (200) and the there is something in the body
            data = body;
        }//this passes the info into the page
        renderArrivalsPage(req, res, data);
      }
    );
  }
};
  
const renderArrivalsPage = (req, res, responseBody) => {
    let message = null;
    
    if (!(responseBody instanceof Array)) {//is the response an array ?
      message = 'API lookup error';
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = 'No results for this airport';
      }
    }//up to here the method just checks if there is an error
    
    res.render('arrivals', 
        {
            airports: Airports,
            clients: responseBody,
            message,
            selectedAirport
        }
    );
};

//this helps render the page
  module.exports = {
    //vatsimArrivals,
    //vatsimAirportSelection,
    prague,
    all,
  };
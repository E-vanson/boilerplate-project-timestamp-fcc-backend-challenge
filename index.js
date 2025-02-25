// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:time",(req,res)=>{
// const parameter = req.params.time;
// const date = new Date(parameter);
// if(isNaN(parameter)){
//   console.log(parameter);
//   //res.send(parameter + " param " + date.toString() );
//  const unix = date.getTime();
//   res.status(200).json({unix: unix, utc:date.toUTCString()});
// }

// if(!isNaN(parameter) && parameter.length === 13){
//   const dateString = new Date(parameter / 1000);
//   const utc = dateString.toUTCString();
//   res.status(200).json({unix: parameter, utc:utc});
// }
// res.json({error:"invalid date"});
let inputDate;

  try {
    // Check if date parameter is provided
    if (req.params.date) {
      const dateString = req.params.date;

      // Check if it's a valid Unix timestamp
      if (!isNaN(dateString) && dateString.length === 13) {
        inputDate = new Date(parseInt(dateString));
      } else {
        inputDate = new Date(dateString);
      }
    } else {
      // If no date parameter provided, use current time
      inputDate = new Date();
    }

    // Check if the input date is invalid
    if (isNaN(inputDate.getTime())) {
      throw new Error('Invalid Date');
    }

    // Format output
    const unixTimestamp = inputDate.getTime();
    const utcDate = inputDate.toUTCString();

    // Return JSON response
    res.json({ unix: unixTimestamp, utc: utcDate });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: 'Invalid Date' });
  }
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

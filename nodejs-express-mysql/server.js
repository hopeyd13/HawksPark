const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mysql = require("mysql");

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

//default route
app.get("/", (req, res) => {
  res.json({ message: "HawksParkAPI server connection." });
});

//allows GET, PUT, and POST calls
app.use(function(req, res, next){
  var allowedOrigins = ['localhost:3000','http://ec2-3-85-184-25.compute-1.amazonaws.com/'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

require("./app/routes/space.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
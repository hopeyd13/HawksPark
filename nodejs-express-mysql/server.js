const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mysql = require("mysql");

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "HawksParkAPI server connection." });
});

app.put("/", (req, res) => {
  res.json({message: "HawksParkAPI server connection."})
});

app.post("/", (req, res) => {
  res.json({message: "HawksParkAPI server connection."})
});

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST OPTIONS');
  return next();
});

require("./app/routes/space.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
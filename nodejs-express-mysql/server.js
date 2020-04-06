const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mysql = require("mysql");

// Create a connection to the database
// const connection = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME,
//   user: process.env.RDS_USERNAME,
//   password: process.env.RDS_PASSWORD,
//   port: process.env.RDS_PORT
// });

// // open the MySQL connection
// connection.connect(error => {
//   if (error) {
//     console.error('Database connection failed: ' + error.stack);
//     return;
//   }
//   console.log('Successfully connected to the database.');
// });

// module.exports = connection;


// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "HawksParkAPI server connection." });
});

require("./app/routes/space.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
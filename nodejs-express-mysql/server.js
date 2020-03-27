const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//repeated at bottom app = require('./app/routes/space.routes.js');

// app.get('/spaces', app.index);
// app.post('/add_space', app.add_space);

var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use('/', routes);

// parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false}));

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
const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

console.log('in dbjs');
// open the MySQL connection
connection.connect(error => {
  //console.log("connection.connect from db.js");
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

module.exports = connection;
const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  name: process.env.RDS_DB_NAME
});

// open the MySQL connection
connection.connect(error => {
  if (error) {
    console.error('Database connection failed: ' + error.stack);
    return;
  }
  console.log('Successfully connected to the database.');
});

module.exports = connection;
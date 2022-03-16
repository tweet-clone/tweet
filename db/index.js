const mysql = require("mysql2");
const dotenv = require("dotenv");
const config = require("../config/config");
dotenv.config();

const con = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
  waitForConnections: true,
  connectionLimit: 100,
});

const db = con.promise();

module.exports = db;

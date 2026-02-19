const mysql = require('mysql2');
require('dotenv').config();

// On crée un "pool" de connexions (plus performant qu'une connexion simple)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// On exporte la version "promise" pour pouvoir utiliser async/await plus tard
module.exports = pool.promise();
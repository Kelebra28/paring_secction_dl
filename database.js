const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DATA_BASE_USER,
    password: process.env.DATA_BASE_PASSWORD,
    database: process.env.DATA_BASE,
});

module.exports = db;
const mysql = require('mysql2');
const PORT = process.env.PORT || 3306;

// MySQL information
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Sheba1776',
    database: 'employee_db'
});

module.exports = db;
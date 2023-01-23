const mysql = require('mysql2');
const PORT = process.env.PORT || 3306;

// MySQL information
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employee_db'
});

module.exports = db;

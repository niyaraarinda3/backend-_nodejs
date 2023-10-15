const config = require('./config')

var mysql = require('mysql');
var db = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db;
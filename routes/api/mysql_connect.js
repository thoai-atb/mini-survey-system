const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passwors: '',
    database: 'mini_survey_system'
})

connection.connect((err) =>{
    if (err) console.log(err)
})

module.exports = connection
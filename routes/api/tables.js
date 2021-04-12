const express = require('express')
const table_router = express.Router()
const connection = require('./mysql_connect')

table_router.get('/', (req, res) => {
    connection.query('SHOW TABLES', (err, rows, fields) => {
        if (err) console.log(err)

        // Use this if you do not need to covert
        // resString = "";
        // rows.forEach(row => {
        //     resString += `<p>${row.Tables_in_mini_survey_system}</p>`;
        // });
        // res.send(resString);

        // Normal response is an array of JSON object.
        res.json(rows);
    })
    // connection.end()
});

module.exports = table_router;
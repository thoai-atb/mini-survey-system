const express = require('express')
const survey_options_router = express.Router()
const connection = require('./mysql_connect')

survey_options_router.get('/', (req, res) => {


    connection.query('DESC survey_options', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

survey_options_router.get('/all', (req, res) => {


    connection.query('SELECT * FROM survey_options', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

module.exports = survey_options_router;
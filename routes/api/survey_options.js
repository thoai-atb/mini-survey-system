const express = require('express')
const survey_options_router = express.Router()
const connection = require('./mysql_connect')

survey_options_router.get('/desc', (req, res) => {


    connection.query('DESC survey_options', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({msg: "Bad Request."});
            return;
        }
        res.json(rows);
    })
});

survey_options_router.get('/', (req, res) => {


    connection.query('SELECT * FROM survey_options', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({msg: "Bad Request."});
            return;
        }
        res.json(rows);
    })
});

module.exports = survey_options_router;
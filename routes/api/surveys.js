const express = require('express')
const surveys_router = express.Router()
const connection = require('./mysql_connect')

surveys_router.get('/', (req, res) => {


    connection.query('DESC surveys', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

surveys_router.get('/all', (req, res) => {


    connection.query('SELECT * FROM surveys', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

module.exports = surveys_router;
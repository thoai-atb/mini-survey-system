const express = require('express')
const comment_router = express.Router()
const connection = require('./mysql_connect')

comment_router.get('/', (req, res) => {


    connection.query('DESC comments', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

comment_router.get('/all', (req, res) => {


    connection.query('SELECT * FROM comments', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

module.exports = comment_router;
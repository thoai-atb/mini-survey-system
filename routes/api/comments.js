const express = require('express')
const comment_router = express.Router()
const connection = require('./mysql_connect')

comment_router.get('/desc', (req, res) => {


    connection.query('DESC comments', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({msg: "Bad Request."});
            return;
        }
        res.json(rows);
    })
});

comment_router.get('/', (req, res) => {


    connection.query('SELECT * FROM comments', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({msg: "Bad Request."});
            return;
        }
        res.json(rows);
    })
});

module.exports = comment_router;
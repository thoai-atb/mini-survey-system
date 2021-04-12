const express = require('express')
const user_router = express.Router()
const connection = require('./mysql_connect')

user_router.get('/', (req, res) => {


    connection.query('DESC users', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

user_router.get('/all', (req, res) => {


    connection.query('SELECT * FROM users', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

// Get info of specific user_id (assume user_id is int)
user_router.get('/:user_id', (req, res) => {

    let user_id = parseInt(req.params.user_id)

    connection.query(`SELECT * FROM users WHERE user_id = ${user_id}`, (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

module.exports = user_router;
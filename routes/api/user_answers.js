const express = require('express')
const user_answer_router = express.Router()
const connection = require('./mysql_connect')

user_answer_router.get('/', (req, res) => {


    connection.query('DESC users_answers', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

user_answer_router.get('/all', (req, res) => {


    connection.query('SELECT * FROM users_answers', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

module.exports = user_answer_router;
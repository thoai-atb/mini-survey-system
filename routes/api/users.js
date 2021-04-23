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

    let user_id = parseInt(req.params.user_id);

    connection.query(`SELECT * FROM users WHERE user_id = ${user_id}`, (err, rows, fields) => {
        if (err) console.log(err);

        res.json(rows);
    })
});

// Insert new user
user_router.post('/', (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let user_token = req.body.user_token;

    connection.query(`INSERT INTO users (email, username, user_token) VALUES ("${email}", "${username}", "${user_token}")`, (err, rows, fields) => {
        if (err) console.log(err);
        else res.send("Succeed.")
    })
});

// Update user (not really used)
user_router.put('/:user_id', (req, res) => {
    let user_id = parseInt(req.params.user_id);
    let email = req.body.email;
    let username = req.body.username;
    let user_token = req.body.user_token; 

    connection.query(`UPDATE users SET email = "${email}", username = "${username}", user_token = "${user_token}" WHERE user_id = "${user_id}"`, (err, rows, fields) => {
        if (err) console.log(err);
        else res.send("Succeed.")
    })
});

// Delete user
user_router.delete('/:user_id', (req, res) => {

    let user_id = parseInt(req.params.user_id);

    connection.query(`DELETE FROM users WHERE user_id = "${user_id}"`, (err, rows, fields) => {
        if (err) console.log(err);

        res.send("Success");
    })
});

module.exports = user_router;
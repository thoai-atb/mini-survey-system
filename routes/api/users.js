const express = require('express')
const user_router = express.Router()
const pool = require('./mysql_connect')

user_router.get('/desc', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query('DESC users', (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            res.json(rows);
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    });
});

user_router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query('SELECT * FROM users', (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            res.json(rows);
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    });
});

// Get info of specific user_id (assume user_id is int)
user_router.get('/:userID', (req, res) => {
    let userID = parseInt(req.params.userID);
    
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`SELECT * FROM users WHERE user_id = ${userID}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            res.json(rows);
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    });
});

// Get user_id bases on user_token
user_router.get('/tokentoid/:userToken', (req, res) => {
    let userToken = req.params.userToken

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`SELECT user_id FROM users WHERE user_token="${userToken}"`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            if (rows.length == 0){
                res.status(400).json({msg :"Could not find user_id corresponding to the given user_token"});
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500).json({msg: "Internal server error: Could not close connection."});
                    return;
                }
            } else {
                res.json(rows[0]);
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500).json({msg: "Internal server error: Could not close connection."});
                    return;
                }
            }
        })
    });
})

// Get list of surveys user has created (owned)
user_router.get('/:userID/surveys', (req, res) => {
    let userID = parseInt(req.params.userID);

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`SELECT * FROM surveys WHERE author_id = ${userID}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            res.json(rows);
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    });
})

// Insert new user
user_router.post('/', (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let userToken = req.body.userToken;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`INSERT INTO users (email, username, user_token) VALUES ("${email}", "${username}", "${userToken}")`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            res.json(rows);
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    }); 
});

// Update user (not really used)
user_router.put('/:userID', (req, res) => {
    let userID = parseInt(req.params.userID);
    let email = req.body.email;
    let username = req.body.username;
    let userToken = req.body.userToken; 

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`UPDATE users SET email = "${email}", username = "${username}", user_token = "${userToken}" WHERE user_id = ${userID}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            res.json(rows);
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    }); 
});

// Delete user
user_router.delete('/:userID', (req, res) => {
    let userID = parseInt(req.params.userID);

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`DELETE FROM users WHERE user_id = "${userID}"`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            res.json(rows);
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    }); 
});

module.exports = user_router;
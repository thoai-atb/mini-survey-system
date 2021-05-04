const express = require('express')
const comment_router = express.Router()
const pool = require('./mysql_connect')

comment_router.get('/desc', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query('DESC comments', (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error."});
                return;
            }
            res.send(rows);
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    });
});

comment_router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query('SELECT * FROM comments', (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error."});
                return;
            }
            res.send(rows);
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    });
});

module.exports = comment_router;
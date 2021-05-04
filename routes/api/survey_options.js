const express = require('express')
const survey_options_router = express.Router()
const pool = require('./mysql_connect')

survey_options_router.get('/desc', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query('DESC survey_options', (err, rows, fields) => {
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

survey_options_router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query('SELECT * FROM survey_options', (err, rows, fields) => {
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

module.exports = survey_options_router;
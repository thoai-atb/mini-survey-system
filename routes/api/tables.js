const express = require('express');
const pool = require('./mysql_connect');
const table_router = express.Router();

table_router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query('SHOW TABLES', (err, rows, fields) => {
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

module.exports = table_router;
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
comment_router.get('/:surveyID', (req, res) => {
    let surveyID = parseInt(req.params.surveyID);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`SELECT c.comment_id, c.content, u.user_id, u.username,c.time FROM comments c INNER JOIN surveys s ON s.survey_id=c.survey_id INNER JOIN users u ON u.user_id = c.user_id WHERE s.survey_id = ${surveyID} ;`, (err, rows, fields) => {
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

comment_router.post('/', (req, res) => {
    let surveyID = req.body.survey_id;
    let user_id = req.body.user_id;
    let content = req.body.content;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`INSERT INTO comments (survey_id, user_id, content) VALUES ("${surveyID}","${user_id}","${content}")`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Bad request."});
                return;
            }
            res.json({msg: "Succeeded."});
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    });
});

// UPDATE content of comments
comment_router.put('/:commentID', (req, res)=>{
    let commentID = parseInt(req.params.commentID);
    let content = req.body.content;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`UPDATE comments SET content = "${content}" WHERE comment_id = ${commentID}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            connection.release();
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Internal server error: Could not close connection."});
                return;
            }
        })
    }); 
})

// DELETE comments
comment_router.delete('/:commentID', (req, res)=>{
    let commentID = parseInt(req.params.commentID);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`DELETE FROM comments WHERE comment_id = "${commentID}"`, (err, rows, fields) => {
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
module.exports = comment_router;
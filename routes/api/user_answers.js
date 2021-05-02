const express = require('express')
const user_answer_router = express.Router()
const connection = require('./mysql_connect')

user_answer_router.get('/desc', (req, res) => {

    connection.query('DESC user_answers', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({msg: "Bad Request."});
            return;
        }
        res.json(rows);
    })
});

user_answer_router.get('/', (req, res) => {

    connection.query('SELECT * FROM user_answers', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({msg: "Bad Request."});
            return;
        }
        res.json(rows);
    })
});

user_answer_router.post('/', (req, res) => {
    let userID = req.body.userID;
    let surveyID = req.body.surveyID;
    let optionID = req.body.optionID;
    connection.query(`SELECT * FROM user_answers WHERE user_id = ${userID} AND survey_id = ${surveyID}`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({msg: "Bad Request."});
            return;
        };
        if (rows.length == 0){ // insert
            connection.query(`INSERT INTO user_answers (user_id, survey_id, option_id) VALUES (${userID}, ${surveyID}, ${optionID})`, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({msg: "Bad Request."});
                    return;
                }
                res.json({msg: "Insert Successfully."});
            })
        }
        if (rows.length == 1){ // update
            connection.query(`UPDATE user_answers SET option_id = ${optionID} WHERE user_id = ${userID} AND survey_id = ${surveyID}`,  (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({msg: "Bad Request."});
                    return;
                };
                res.json({msg: "Update sucessfully."});
            })
        }
    });


});

module.exports = user_answer_router;
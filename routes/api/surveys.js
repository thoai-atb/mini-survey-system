const express = require('express')
const surveys_router = express.Router()
const pool = require('./mysql_connect');

surveys_router.get('/desc', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query('DESC surveys', (err, rows, fields) => {
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


// Retrieve list of surveys(optional parameter: userID, surveyID). Usage: 
// 'http://localhost:5000/api/surveys/' -> return all
// 'http://localhost:5000/api/surveys/?userID=11' -> return all surveys related to userID 11
// 'http://localhost:5000/api/surveys/?surveyID=10' -> return the information about the surveyID 10
// 'http://localhost:5000/api/surveys/?surveyID=10&userID=11' -> return the information about the surveyID 10 with user id 11
surveys_router.get('/', (req, res) => {
    let surveyID = req.query.surveyID;
    let userID = req.query.userID;

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        if (surveyID == null && userID == null) {
            connection.query(`SELECT surveys.*, users.username AS author FROM surveys INNER JOIN users ON surveys.author_id = users.user_id`, (err, rows, fields) => {
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
        };

        if (surveyID != null && userID == null) {
            connection.query(`SELECT surveys.*, users.username AS author FROM surveys INNER JOIN users 
            ON surveys.author_id = users.user_id WHERE survey_id = ${surveyID}`, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({msg: "Bad Request."});
                    return;
                }
                if (rows.length == 0){
                    res.status(400).json({msg :"Could not find survey given the surveyID."});
                    return;
                }
                let result = rows[0];
                connection.query(`SELECT * FROM survey_options WHERE survey_id = ${surveyID}`, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({msg: "Bad Request."});
                        return;
                    }
                    result.options = rows;
                    res.json(result);
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500).json({msg: "Internal server error: Could not close connection."});
                        return;
                    }
                })
            })
        };

        if (surveyID == null && userID != null) {
            connection.query(`SELECT surveys.*, users.username AS author FROM surveys INNER JOIN users ON surveys.author_id = users.user_id`, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({msg: "Bad Request."});
                    return;
                }
                let results = rows;
                connection.query(`SELECT survey_options.* FROM survey_options INNER JOIN user_answers 
                ON survey_options.option_id = user_answers.option_id 
                WHERE user_answers.user_id = ${userID}`, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({msg: "Bad Request."});
                        return;
                    }
                    for (let row of rows) {
                        for (let result of results) {
                            if (row.survey_id == result.survey_id) {
                                result.answer = {option_id: row.option_id, description: row.description};
                                break;
                            }
                        }
                    }
                    res.json(results);
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.status(500).json({msg: "Internal server error: Could not close connection."});
                        return;
                    }
                })
            })
        }

        if (surveyID != null && userID != null) {
            connection.query(`SELECT surveys.*, users.username AS author FROM surveys INNER JOIN users 
            ON surveys.author_id = users.user_id WHERE survey_id = ${surveyID}`, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({msg: "Bad Request."});
                    return;
                }
                if (rows.length == 0){
                    res.status(400).json({msg :"Could not find survey given the surveyID."});
                    return;
                }
                let result = rows[0];
                connection.query(`SELECT * FROM survey_options WHERE survey_id = ${surveyID}`, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({msg: "Bad Request."});
                        return;
                    }
                    result.options = rows;
                    connection.query(`SELECT survey_options.* FROM survey_options INNER JOIN user_answers 
                    ON survey_options.option_id = user_answers.option_id 
                    WHERE user_answers.user_id = ${userID} AND user_answers.survey_id = ${surveyID}`, (err, rows, fields) => {
                        if (err) {
                            console.log(err);
                            res.status(400).json({msg: "Bad Request."});
                            return;
                        }
                        if (rows.length == 0){
                            res.json(result);
                            connection.release();
                            if (err) {
                                console.log(err);
                                res.status(500).json({msg: "Internal server error: Could not close connection."});
                                return;
                            }
                            return;
                        }
                        result.answer = {option_id: rows[0].option_id, description: rows[0].description};
                        res.json(result);
                        connection.release();
                        if (err) {
                            console.log(err);
                            res.status(500).json({msg: "Internal server error: Could not close connection."});
                            return;
                        }
                    })
                })
            })
        }
    }); 
});

surveys_router.get('/statistics/:surveyID', (req, res) => {
    let surveyID = req.params.surveyID

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`SELECT t.option_id, t.answer_count, t.answer_count/surveys.total_answered*100 AS percentage
        FROM
            (SELECT survey_options.survey_id, survey_options.option_id, COUNT(user_answers.option_id) AS answer_count
            FROM survey_options LEFT JOIN user_answers
            ON survey_options.option_id = user_answers.option_id
            WHERE survey_options.survey_id = ${surveyID}
            GROUP BY survey_options.option_id) 
        as t INNER JOIN surveys
        WHERE t.survey_id = surveys.survey_id`, (err, rows, fields) => {
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

surveys_router.post('/', (req, res) => {
    let authorID = req.body.authorID
    let title = req.body.title
    let description = req.body.description
    let options = req.body.options
    
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            res.status(500).json({msg: "Internal server error: Could not get connection."});
            return;
        }
        connection.query(`INSERT INTO surveys (title, description, author_id) VALUES ("${title}", "${description}", "${authorID}");`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            connection.query(`SELECT survey_id FROM surveys WHERE title = "${title}" AND description = "${description}" AND author_id = ${authorID}`, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({msg: "Bad Request."});
                    return;
                }
                let surveyID = parseInt(rows[0]["survey_id"]);
                let insert = "";
                for (i in options){
                    insert += `(${surveyID}, "${options[i]}"), `
                }
                insert = insert.slice(0, -2);
                connection.query(`INSERT INTO survey_options (survey_id, description) VALUES ${insert}`, (err, rows, fileds) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({msg: "Bad Request."});
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
            })
        });
    });
})

module.exports = surveys_router;
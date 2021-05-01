const express = require('express')
const surveys_router = express.Router()
const connection = require('./mysql_connect');

surveys_router.get('/desc', (req, res) => {
    connection.query('DESC surveys', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).json({msg: "Bad Request."})
        } 
        else res.json(rows);
    })
});


// Retrieve list of surveys(optional parameter: userID, surveyID). Usage: 
// 'http://localhost:5000/api/surveys/' -> return all
// 'http://localhost:5000/api/surveys/?userID=11' -> return all surveys related to userID 11
// 'http://localhost:5000/api/surveys/?surveyID=10' -> return the information about the surveyID 10
// 'http://localhost:5000/api/surveys/?surveyID=10&userID=11' -> return the information about the surveyID 10 with user id 11
surveys_router.get('/', (req, res) => {
    let surveyID = req.query.surveyID;
    let userID = req.query.userID;

    if (surveyID == null && userID == null) {
        connection.query(`SELECT surveys.*, users.username AS author FROM surveys INNER JOIN users ON surveys.author_id = users.user_id`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            res.json(rows);
        })
    };

    if (surveyID != null && userID == null) {
        connection.query(`SELECT surveys.*, users.username AS author FROM surveys INNER JOIN users 
        ON surveys.author_id = users.user_id WHERE survey_id = ${surveyID}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."})
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
            })
        })
    };

    if (surveyID == null && userID != null) {
        connection.query(`SELECT surveys.*, users.username AS author, survey_options.description AS answer 
        FROM surveys INNER JOIN user_answers INNER JOIN survey_options INNER JOIN users 
        ON user_answers.option_id = survey_options.option_id AND surveys.survey_id = user_answers.survey_id AND surveys.author_id = users.user_id 
        WHERE user_answers.user_id = ${userID}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
                return;
            }
            res.json(rows);
        })
    }

    if (surveyID != null && userID != null) {
        connection.query(`SELECT surveys.*, users.username AS author, survey_options.description AS answer 
        FROM surveys INNER JOIN user_answers INNER JOIN survey_options INNER JOIN users 
        ON user_answers.option_id = survey_options.option_id AND surveys.survey_id = user_answers.survey_id AND surveys.author_id = users.user_id 
        WHERE surveys.survey_id = ${surveyID} AND user_answers.user_id = ${userID}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.status(400).json({msg: "Bad Request."});
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
            })
        })
    }
    // console.log({"surveyID" : surveyID, "userID" : userID});
    // res.status(200).json({"surveyID" : surveyID, "userID" : userID});
});


// surveys_router.get('/:id', (req, res) => {
//     let surveyID = parseInt(req.params.id);

//     connection.query(`SELECT surveys.*, users.username AS author FROM surveys INNER JOIN users 
//     WHERE surveys.author_id = users.user_id AND survey_id = ${surveyID}`, (err, rows, fields) => {
//         if (err) console.log(err);
//         let result = rows[0];
//         connection.query(`SELECT * FROM survey_options WHERE survey_id = ${surveyID}`, (err, rows, fields) => {
//             if (err) console.log(err);
//             result.options = rows;
//             res.json(result);
//         })

//         // console.log(rows[0]['survey_id']);
//         // res.type('txt');
//         // res.send(JSON.stringify(rows[0]['survey_id']));
//     })
// });

surveys_router.post('/', (req, res) => {
    let authorID = req.body.authorID
    let title = req.body.title
    let description = req.body.description
    let options = req.body.options
    
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
            // console.log(surveyID);
            // console.log(options);
            let insert = "";
            for (i in options){
                insert += `(${surveyID}, "${options[i]}"), `
            }
            insert = insert.slice(0, -2);
            // console.log(insert)
            connection.query(`INSERT INTO survey_options (survey_id, description) VALUES ${insert}`, (err, rows, fileds) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({msg: "Bad Request."});
                    return;
                }
                res.json({msg: "Succeeded."});
            })
        })
    });
})

module.exports = surveys_router;
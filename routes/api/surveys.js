const express = require('express')
const surveys_router = express.Router()
const connection = require('./mysql_connect');

surveys_router.get('/', (req, res) => {
    connection.query('DESC surveys', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});

surveys_router.get('/all', (req, res) => {
    connection.query('SELECT * FROM surveys', (err, rows, fields) => {
        if (err) console.log(err)

        res.json(rows);
    })
});


surveys_router.get('/:id', (req, res) => {
    let surveyID = parseInt(req.params.id);

    connection.query(`SELECT * FROM surveys WHERE survey_id = ${surveyID}`, (err, rows, fields) => {
        if (err) console.log(err);
        res.json(rows);
        // console.log(rows[0]['survey_id']);
        // res.type('txt');
        // res.send(JSON.stringify(rows[0]['survey_id']));
    })
});

surveys_router.post('/', (req, res) => {
    let authorID = req.body.authorID
    let title = req.body.title
    let description = req.body.description
    let options = req.body.options
    
    connection.query(`INSERT INTO surveys (title, description, author_id) VALUES ("${title}", "${description}", "${authorID}");`, (err, rows, fields) => {
        if (err) console.log(err)
        connection.query(`SELECT survey_id FROM surveys WHERE title = "${title}" AND description = "${description}" AND author_id = ${authorID}`, (err, rows, fields) => {
            if (err) console.log(err)
            let surveyID = parseInt(rows[0]["survey_id"]);
            console.log(surveyID);
            console.log(options);
            let insert = "";
            for (i in options){
                insert += `(${surveyID}, "${options[i]}"), `
            }
            insert = insert.slice(0, -2);
            console.log(insert)
            connection.query(`INSERT INTO survey_options (survey_id, description) VALUES ${insert}`, (err, rows, fileds) => {
                if (err) console.log(err); 
                res.send("Succeeded.");
            })
        })
    });
})

module.exports = surveys_router;
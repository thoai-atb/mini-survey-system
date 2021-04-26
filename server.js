const express = require('express');
const app = express();

// Homepage route - But nothing here
app.get('/', (req, res) => {
    res.send('hello')
})

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// API routes
app.use('/api/tables', require('./routes/api/tables'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/user_answers', require('./routes/api/user_answers'));
app.use('/api/survey_options', require('./routes/api/survey_options'));
app.use('/api/surveys', require('./routes/api/surveys'));
app.use('/api/comments', require('./routes/api/comments'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

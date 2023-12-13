const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/articles/:articleId/comments', (req, res) => {
    const comments = [];

    // ...

    res.json(comments);
});

app.listen(3000, () => console.log('Server started'));
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/articles', (req, res) => {
    const articles = [];

    // ...

    res.json(articles);
});

app.post('/articles', (req, res) => {
    // code to add a new article...
    res.json(req.body);
});

app.put('/articles/:id', (req, res) => {

    // ...

    res.json(req.body);
});

app.delete('/articles/:id', (req, res) => {
    const { id } = req.params;

    // ...

    res.json({ deleted: id });
});

app.listen(3000, () => console.log('Server started'));
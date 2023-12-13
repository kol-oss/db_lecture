const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/v1/users', (req, res) => {
    const users = [];

    // ...

    res.json(users);
});

app.get('/v2/users', (req, res) => {
    const users = [];

    // ...

    res.json(users);
});

app.listen(3000, () => console.log('Server started'));
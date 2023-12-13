const express = require('express');
const bodyParser = require('body-parser');
const apicache = require('apicache');

const app = express();
let cache = apicache.middleware;

app.use(cache('5 minutes'));
app.use(bodyParser.json());

const users = [
    { firstName: 'Mad', lastName: 'Bee', age: 27 },
    { firstName: 'Kaban', lastName: 'Ivanovich', age: 33 },
]

app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(3000, () => console.log('Server started'));
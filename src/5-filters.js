const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const users = [
    { firstName: 'Kaban', age: 33 },
    { firstName: 'Bee', age: 27 },
]

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    const { firstName, age } = req.query;
    let filtered = [...users];

    if (firstName) {
        filtered = filtered.filter(
            user => user.firstName === firstName
        );
    }

    if (age) {
        filtered = filtered.filter(
            user => Number(user.age) === Number(age)
        );
    }

    res.json(filtered);
});

app.listen(3000, () => console.log('Server started'));
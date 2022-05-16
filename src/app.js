const express = require('express');
const readerRouter = require('./routes/reader');


const app = express();

app.use(express.json());

app.post('/readers', (req, res) => {
    res.sendStatus(201)
});

module.exports = app;


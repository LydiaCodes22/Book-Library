/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');

const app = express();
// const cors = require('cors');

// app.use(cors());

app.use(express.json());


module.exports = app;
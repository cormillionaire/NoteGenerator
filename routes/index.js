const express = require('express');
const notes = require('./notes');
const notFound = require('./notFound');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
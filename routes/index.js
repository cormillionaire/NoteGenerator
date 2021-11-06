const express = require('express');
const notesRouter = require('./notes');
const notFound = require('./notFound');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
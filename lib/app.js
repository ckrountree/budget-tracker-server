const express = require('express');
const app = express();

/* middleware */
// const checkDb = require('./check-connection')();
const errorHandler = require('./utils/error-handler')();

app.use(express.static('./public'));

const category = require('./routes/categories');
const expenses = require('./routes/expenses');

// app.use(checkDb);
app.use('/api/categories', category);
app.use('/api/expenses', expenses);

app.use(errorHandler);

module.exports = app;
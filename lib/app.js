const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();

/* middleware */
// const checkDb = require('./check-connection')();
const errorHandler = require('./utils/error-handler')();

app.use(express.static('./public'));

const category = require('./routes/categories');
const expenses = require('./routes/expenses');
const auth = require('./routes/auth');

// app.use(checkDb);
app.use(bodyParser);
app.use('/api/categories', category);
app.use('/api/expenses', expenses);
app.use('/api/auth', auth);

app.use(errorHandler);

module.exports = app;
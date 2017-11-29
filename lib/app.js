const express = require('express');
const app = express();

/* middleware */
const checkDb = require('./check-connection')();
const errorHandler = require('./error-handler')();

app.use(express.static('./public'));

const category = require('./routes/categories');

app.use(checkDb);
app.use('/api/categories', category);

app.use(errorHandler);

module.exports = app;
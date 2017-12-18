const connect = require('../lib/utils/connect');
const url = 'mongodb://localhost:27017/categories-test';
const mongoose = require('mongoose');

before(() => connect(url));    
after(() => mongoose.connection.close());


module.exports = {
    drop() {
        return mongoose.connection.dropDatabase();
    }
};
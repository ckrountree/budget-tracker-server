const connect = require('../lib/utils/connect');
const url = 'mongodb://localhost:27017/categories-test';
const mongoose = require('mongoose');

before(() => connect(url));    
after(() => mongoose.connection.close());


module.exports = {
    drop(connection) {
        return () => {
            return new Promise((resolve, reject) => {
                const drop = () => connection.db.dropDatabase((error, value) => {
                    error ? reject(error) : resolve(value);
                });
                if (connection.readyState === 1) drop();
                else connect.on('open', drop);
            });
        };
    }
};
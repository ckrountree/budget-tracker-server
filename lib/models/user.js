const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const requiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: String,
    email: requiredString,
    hash: requiredString
});

schema.static('emailExists', function(query) {
    return this.find(query)
        .count()
        .then(count => (count > 0));
});

schema.method('generateHash', function(password) {
    this.hash = bcrypt.hashSync(password, 5);
});

schema.method('comparePassword', function(password) {
    return bcrypt.compareSync(password, this.hash);
});

module.exports = mongoose.model('User', schema);
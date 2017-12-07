const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    expense: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

module.exports = mongoose.model('Expense', schema);
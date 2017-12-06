const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: String,
    timestamp: Date,
    name: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    // expenses: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Expense',
    //     required: true
    // }]
});

module.exports = mongoose.model('Category', schema);
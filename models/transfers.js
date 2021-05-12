const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transferSchema = new Schema({
    senderId: String,
    recieverId: String,
    amount: Number,
    reason: String,
    text: String
});

const Transfer = mongoose.model('transfer', transferSchema);

module.exports = Transfer;


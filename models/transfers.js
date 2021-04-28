const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transferSchema = new Schema({
    senderId: String,
    recieverId: String,
    text: String,
    amount: String
});

const Transfer = mongoose.model('transfer', transferSchema);

module.exports = Transfer;


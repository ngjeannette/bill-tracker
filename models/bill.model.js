const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
    username: { type: String, required: true },
    billname: { type: String, required: true },
    billamount: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
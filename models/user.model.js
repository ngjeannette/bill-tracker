const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

const Username = mongoose.model('UserBill', userSchema);
module.exports = Username;
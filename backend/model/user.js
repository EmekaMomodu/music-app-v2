const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            index: {unique: true}
        },
        password: {
            type: String,
        },
        salt: {
            type: String,
        },
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        role: {
            type: String,
        },
        email_verified_flag: {
            type: String,
        },
        type: {
            type: String,
        },
        status: {
            type: String,
        },
    }
);

module.exports = mongoose.model('User', userSchema);
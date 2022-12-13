const mongoose = require('mongoose');
const {USER_ROLE, BINARY_FLAG, USER_TYPE, USER_STATUS} = require('../util/constant');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            index: {unique: true}
        },
        password: {
            type: String
        },
        salt: {
            type: String
        },
        name: {
            type: String,
            index: {unique: true}
        },
        role: {
            type: String,
            default: USER_ROLE.USER
        },
        email_verified_flag: {
            type: String,
            default: BINARY_FLAG.NO
        },
        type: {
            type: String,
            default: USER_TYPE.LOCAL
        },
        status: {
            type: String,
            default: USER_STATUS.ACTIVE
        },
    }
);

module.exports = mongoose.model('User', userSchema);

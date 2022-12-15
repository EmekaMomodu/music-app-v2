const {MESSAGES, USER_TYPE, USER_STATUS} = require('../util/constant');
const User = require('../model/user');
const jwt = require("../util/jwt/jwt");
const bcrypt = require('bcrypt');
const UserDto = require("../dto/user");

exports.authenticate = async (user) => {
    // find user by email
    const existingUser = await User.findOne({email: {$regex: '^' + user.email + '$', $options: 'i'}}).exec();
    if (!existingUser) {
        const error = new Error(MESSAGES.USER_DOES_NOT_EXIST);
        error.statusCode = 404;
        throw error;
    }
    // prepend salt to provided password
    const saltPrependedPassword = existingUser.salt + user.password;
    // verify saltPrependedPassword with hash
    const hashedPassword = existingUser.password;
    const passwordVerified = bcrypt.compareSync(saltPrependedPassword, hashedPassword);
    if (!passwordVerified) {
        const error = new Error(MESSAGES.INVALID_CREDENTIALS);
        error.statusCode = 401;
        throw error;
    }
    // ensure user type is local
    if (existingUser.type !== USER_TYPE.LOCAL) {
        const error = new Error(MESSAGES.ATTEMPT_A_DIFFERENT_LOGIN_MECHANISM);
        error.statusCode = 401;
        throw error;
    }
    // ensure user status is active
    if (existingUser.status === USER_STATUS.DEACTIVATED) {
        const error = new Error(MESSAGES.ACCOUNT_DEACTIVATED);
        error.statusCode = 401;
        throw error;
    }
    // generate token and return authenticatedUser
    const authenticatedUser = new UserDto(existingUser);
    authenticatedUser.token = jwt.generateToken(authenticatedUser.id);
    return authenticatedUser;
};

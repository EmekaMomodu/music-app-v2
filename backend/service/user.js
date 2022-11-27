const {MESSAGES} = require('../util/constant');
const User = require('../model/user');
const UserDto = require("../dto/user");
const bcrypt = require('bcrypt');

exports.createUser = async (user) => {
    // find user by email to check if email exists already
    const existingUser = await User.findOne({email: {$regex: '^' + user.email + '$', $options: 'i'}}).exec();
    if (existingUser) {
        const error = new Error(MESSAGES.USER_WITH_EMAIL_ALREADY_EXISTS);
        error.statusCode = 409;
        throw error;
    }
    // generate salt and add to user object
    const salt = bcrypt.genSaltSync(10);
    user.salt = salt;
    // hash password with salt prepended and replace in user object
    user.password = bcrypt.hashSync(user.password, salt);
    // save user to database
    const savedUser = await new User(user).save();
    // return user object dto
    return new UserDto(savedUser);
};

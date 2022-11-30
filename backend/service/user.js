const {MESSAGES} = require('../util/constant');
const User = require('../model/user');
const UserDto = require("../dto/user");
const bcrypt = require('bcrypt');
const rand = require('csprng');

exports.createUser = async (user) => {
    // find user by email to check if email exists already
    const existingUser = await User.findOne({email: {$regex: '^' + user.email + '$', $options: 'i'}}).exec();
    if (existingUser) {
        const error = new Error(MESSAGES.USER_WITH_EMAIL_ALREADY_EXISTS);
        error.statusCode = 409;
        throw error;
    }
    // generate cryptographically secure salt and add to user object
    const salt = rand(160, 36);
    user.salt = salt;
    // prepend salt to provided password
    const saltPrependedPassword = salt + user.password;
    // hash saltPrependedPassword replace password in user object
    user.password = bcrypt.hashSync(saltPrependedPassword, bcrypt.genSaltSync(10));
    // save user to database
    const savedUser = await new User(user).save();
    // return user object dto
    return new UserDto(savedUser);
};

exports.getUserById = async (id) => {
    // find user by id
    const user = await User.findById(id).exec();
    // throw an exception if user does not exist
    if (!user) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    // return user object dto
    return new UserDto(user);
};

exports.getAllUsers = async () => {
    // find all users
    const users = await User.find().exec();
    // throw an exception if no user exists
    if (!users || !users.length) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    // return users object dto
    return users.map((user) => {
        return new UserDto(user);
    })
};

exports.updateUserRoleOrStatus = async (user) => {
    // find user by id
    const existingUser = await User.findById(user.id).exec();
    // throw an exception if user does not exist
    if (!existingUser) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    if (user.role) existingUser.role = user.role;
    if (user.status) existingUser.status = user.status;
    // update existingUser on database
    const updatedUser = await existingUser.save();
    // return user object dto
    return new UserDto(updatedUser);
};
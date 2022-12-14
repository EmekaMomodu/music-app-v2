const {MESSAGES, USER_TYPE, USER_STATUS} = require('../util/constant');
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

exports.updateUserPassword = async (userToUpdate, userId) => {
    // throw exception if userId is not the same as updatedUserId
    if(userId !== userToUpdate.id){
        const error = new Error(MESSAGES.NOT_AUTHORIZED_TO_PERFORM_ACTION);
        error.statusCode = 403;
        throw error;
    }
    // find user by id
    const existingUser = await User.findById(userToUpdate.id).exec();
    // throw an exception if user does not exist
    if (!existingUser) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    // throw exception if userToUpdate oldPassword is not the same as current password
    // prepend salt to provided password
    const saltPrependedOldPassword = existingUser.salt + userToUpdate.oldPassword;
    // verify saltPrependedOldPassword with hash
    const hashedExistingPassword = existingUser.password;
    const passwordVerified = bcrypt.compareSync(saltPrependedOldPassword, hashedExistingPassword);
    if (!passwordVerified) {
        const error = new Error(MESSAGES.INCORRECT_PASSWORD);
        error.statusCode = 403;
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
    // update user
    // generate cryptographically secure salt and add to user object
    const salt = rand(160, 36);
    existingUser.salt = salt;
    // prepend salt to provided password
    const saltPrependedPassword = salt + userToUpdate.newPassword;
    // hash saltPrependedPassword replace password in user object
    existingUser.password = bcrypt.hashSync(saltPrependedPassword, bcrypt.genSaltSync(10));
    // save user to database
    const savedUser = await existingUser.save();
    // return user object dto
    return new UserDto(savedUser);
};

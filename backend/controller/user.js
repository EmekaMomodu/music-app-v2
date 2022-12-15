const Response = require('../dto/response');
const {MESSAGES} = require('../util/constant');
const userService = require("../service/user");

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        const response = new Response(true, MESSAGES.DATA_CREATED_SUCCESSFULLY, user);
        res.status(201).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.updateUserRoleOrStatus = async (req, res, next) => {
    try {
        const user = await userService.updateUserRoleOrStatus(req.body);
        const response = new Response(true, MESSAGES.DATA_UPDATED_SUCCESSFULLY, user);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        const response = new Response(true, MESSAGES.DATA_FETCHED_SUCCESSFULLY, users);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.updateUserPassword = async (req, res, next) => {
    try {
        const user = await userService.updateUserPassword(req.body, req.userId);
        const response = new Response(true, MESSAGES.DATA_UPDATED_SUCCESSFULLY, user);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.updateUserEmailVerification = async (req, res, next) => {
    try {
        const user = await userService.updateUserEmailVerification(req.userId);
        const response = new Response(true, MESSAGES.DATA_UPDATED_SUCCESSFULLY, user);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};


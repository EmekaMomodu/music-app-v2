const Response = require('../dto/response');
const {MESSAGES} = require('../util/constant');
const userService = require("../service/user");

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        const response = new Response(MESSAGES.DATA_CREATED_SUCCESSFULLY, user);
        res.status(201).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};
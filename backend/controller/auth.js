const Response = require('../dto/response');
const {MESSAGES} = require('../util/constant');
const authService = require("../service/auth");

exports.authenticate = async (req, res, next) => {
    try {
        const user = await authService.authenticate(req.body);
        const response = new Response(MESSAGES.AUTHENTICATION_SUCCESSFUL, user);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};
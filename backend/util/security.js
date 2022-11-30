const {MESSAGES, USER_ROLE} = require("./constant");
const jwt = require("../util/jwt/jwt");
const userService = require('../service/user');

const securePath = '/secure';
const adminPath = '/admin';

const validateJwtForSecureRoutes = async (req, res, next) => {
    // check if req url contains /secure or /admin
    // validate jwt, throw exception if invalid
    // call next
    const requestUrl = req.originalUrl.toLowerCase();
    if (requestUrl.includes(securePath) || requestUrl.includes(adminPath)) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            const error = new Error(MESSAGES.ACCESS_TOKEN_REQUIRED);
            error.statusCode = 401;
            throw error;
        }
        let jwtClaims;
        try {
            jwtClaims = jwt.verifyToken(token);
        } catch (error) {
            if (!error.statusCode) error.statusCode = 401;
            throw error;
        }
        // if route contains /admin, verify that user is an admin
        if (requestUrl.includes(adminPath)) {
            const user = await userService.getUserById(jwtClaims.userId);
            if (user.role !== USER_ROLE.ADMIN) {
                const error = new Error(MESSAGES.ONLY_ADMINS_ARE_ALLOWED);
                error.statusCode = 403;
                throw error;
            }
        }
        req.userId = jwtClaims.userId;
    }
    next();
}

module.exports = validateJwtForSecureRoutes;
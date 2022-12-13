const {MESSAGES} = require("./constant");
const jwt = require("../util/jwt/jwt");

const validateJwtForSecureRoutes = () => {
    return (req, res, next) => {
        // check if req url contains secure or admin
        // validate jwt, throe exception if invalid
        // call next
        const requestUrl = req.originalUrl.toLowerCase();
        if (requestUrl.includes('secure') || requestUrl.includes('admin')) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) {
                const error = new Error(MESSAGES.ACCESS_TOKEN_REQUIRED);
                error.statusCode = 401;
                throw error;
            }
            try {
                const decoded = jwt.verifyToken(token);
                req.userId = decoded.userId;
            } catch (error) {
                if (!error.statusCode) error.statusCode = 401;
                throw error;
            }
        }
        next();
    }
}

module.exports = validateJwtForSecureRoutes;

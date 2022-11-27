const Joi = require('joi');

const schemas = {
    USER_CREATE: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'ca'] } })
            .min(6)
            .max(30)
            .trim()
            .lowercase()
            .required(),
        password: Joi.string()
            .min(3)
            .max(30)
            .required(),
        firstname: Joi.string()
            .min(1)
            .max(30)
            .trim()
            .uppercase()
            .required(),
        lastname: Joi.string()
            .min(1)
            .max(30)
            .trim()
            .uppercase()
            .required()
    }),
    AUTH: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'ca'] } })
            .min(6)
            .max(30)
            .trim()
            .lowercase()
            .required(),
        password: Joi.string()
            .min(3)
            .max(30)
            .required()
    })
};

module.exports = schemas;
const Joi = require('joi');
const {USER_ROLE, USER_STATUS} = require("../constant");

const schemas = {
    USER_CREATE: Joi.object().keys({
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'ca']}})
            .min(6)
            .max(30)
            .trim()
            .lowercase()
            .required(),
        password: Joi.string()
            .min(3)
            .max(30)
            .required(),
        name: Joi.string()
            .min(1)
            .max(30)
            .trim()
            .uppercase()
            .required()
    }),

    AUTH: Joi.object().keys({
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'ca']}})
            .min(6)
            .max(30)
            .trim()
            .lowercase()
            .required(),
        password: Joi.string()
            .min(3)
            .max(30)
            .required()
    }),

    USER_UPDATE_ROLE_STATUS: Joi.object().keys({
        id: Joi.string()
            .min(1)
            .max(50)
            .required(),
        role: Joi.string()
            .valid(USER_ROLE.USER, USER_ROLE.ADMIN)
            .optional(),
        status: Joi.string()
            .valid(USER_STATUS.ACTIVE, USER_STATUS.DEACTIVATED)
            .optional()
    }).min(2),

    TRACK_SEARCH: Joi.object().keys({
        searchText: Joi.string()
            .min(1)
            .max(20)
            .required(),
        maxNoOfRecords: Joi.number()
            .min(1)
            .max(50)
            .required()
    }),

    TRACK_GET_BY_ID: Joi.object().keys({
        id: Joi.number()
            .min(1)
            .required()
    })
};

module.exports = schemas;

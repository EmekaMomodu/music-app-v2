const Joi = require('joi');
const {USER_ROLE, USER_STATUS, PLAYLIST_VISIBILITY} = require("../constant");

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
            .trim()
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
            .trim()
            .required(),
        maxNoOfRecords: Joi.number()
            .min(1)
            .max(50)
            .required()
    }),

    NUMBER_ID: Joi.object().keys({
        id: Joi.number()
            .min(1)
            .max(1000000)
            .required()
    }),

    PLAYLIST_CREATE: Joi.object().keys({
        name: Joi.string()
            .min(1)
            .max(30)
            .trim()
            .uppercase()
            .required(),
        description: Joi.string()
            .min(1)
            .max(100)
            .trim()
            .optional(),
        trackIds: Joi.array().items(
            Joi.number()
                .min(1)
                .max(1000000))
            .min(1)
            .required(),
        visibility: Joi.string()
            .valid(PLAYLIST_VISIBILITY.PRIVATE, PLAYLIST_VISIBILITY.PUBLIC)
            .optional(),
    }),

    PLAYLIST_UPDATE: Joi.object().keys({
        id: Joi.string()
            .min(1)
            .max(50)
            .trim()
            .required(),
        name: Joi.string()
            .min(1)
            .max(30)
            .trim()
            .uppercase()
            .required(),
        description: Joi.string()
            .min(1)
            .max(100)
            .trim()
            .optional(),
        trackIds: Joi.array().items(
            Joi.number()
                .min(1)
                .max(1000000))
            .min(1)
            .required(),
        visibility: Joi.string()
            .valid(PLAYLIST_VISIBILITY.PRIVATE, PLAYLIST_VISIBILITY.PUBLIC)
            .optional(),
    }),

    OBJECT_ID: Joi.object().keys({
        id: Joi.string()
            .min(1)
            .max(1000000)
            .trim()
            .required()
    }),

    REVIEW_CREATE: Joi.object().keys({
        playlistId: Joi.string()
            .min(1)
            .max(50)
            .trim()
            .required(),
        comment: Joi.string()
            .min(1)
            .max(1000000)
            .trim()
            .required(),
    })
};

module.exports = schemas;

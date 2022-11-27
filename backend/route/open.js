const express = require('express');
const userController = require('../controller/user');
const authController = require('../controller/auth');
const schemas = require('../util/validator/schema');
const validator = require('../util/validator/validator');

const router = express.Router();

const body = 'body';

/** auth routes */
router.post('/auth', validator(schemas.AUTH, body), authController.authenticate);

/** user routes */
router.post('/users', validator(schemas.USER_CREATE, body), userController.createUser);

module.exports = router;
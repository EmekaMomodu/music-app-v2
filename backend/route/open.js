const express = require('express');
const userController = require('../controller/user');
const schemas = require('../util/validator/schema');
const validator = require('../util/validator/validator');

const router = express.Router();

// user routes
router.post('/users', validator(schemas.USER_CREATE, 'body'), userController.createUser);

module.exports = router;
const express = require('express');
const validator = require("../util/validator/validator");
const schemas = require("../util/validator/schema");
const userController = require("../controller/user");

const router = express.Router();
const body = 'body';

/** user routes */
router.put('/users', validator(schemas.USER_UPDATE_ROLE_STATUS, body), userController.updateUserRoleOrStatus);
router.get('/users', userController.getAllUsers);

module.exports = router;

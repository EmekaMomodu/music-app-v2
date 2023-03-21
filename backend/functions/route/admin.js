const express = require('express');
const validator = require("../util/validator/validator");
const schemas = require("../util/validator/schema");
const userController = require("../controller/user");
const playlistController = require('../controller/playlist')

const router = express.Router();
const body = 'body';
const params = 'params';

/** user routes */
router.put('/users', validator(schemas.USER_UPDATE_ROLE_STATUS, body), userController.updateUserRoleOrStatus);
router.get('/users', userController.getAllUsers);

/** playlist routes */
router.get('/playlists/:id', validator(schemas.OBJECT_ID, params), playlistController.getPublicPlaylistByIdForAdmin);
router.put('/playlists/reviews', validator(schemas.REVIEW_UPDATE, body), playlistController.updatePlaylistReviewHiddenFlag);

module.exports = router;

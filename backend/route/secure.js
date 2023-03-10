const express = require('express');
const validator = require("../util/validator/validator");
const schemas = require("../util/validator/schema");
const playlistController = require("../controller/playlist");
const userController = require("../controller/user");

const router = express.Router();
const body = 'body';
const params = 'params';

/** playlist routes */
router.post('/playlists', validator(schemas.PLAYLIST_CREATE, body), playlistController.createPlaylist);
router.put('/playlists', validator(schemas.PLAYLIST_UPDATE, body), playlistController.updatePlaylist);
router.get('/playlists/:id', validator(schemas.OBJECT_ID, params), playlistController.getPlaylistById);
router.delete('/playlists/:id', validator(schemas.OBJECT_ID, params), playlistController.deletePlaylistById);
router.get('/playlists', playlistController.getAllPlaylistInfo);
router.post('/playlists/reviews', validator(schemas.REVIEW_CREATE, body), playlistController.createReviewForPublicPlaylist);

/** user routes */
router.put('/users', validator(schemas.USER_UPDATE_PASSWORD, body), userController.updateUserPassword);
router.get('/users/email', userController.updateUserEmailVerification);

module.exports = router;

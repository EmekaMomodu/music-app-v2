const express = require('express');
const userController = require('../controller/user');
const authController = require('../controller/auth');
const trackController = require('../controller/track');
const schemas = require('../util/validator/schema');
const validator = require('../util/validator/validator');
const playlistController = require("../controller/playlist");

const router = express.Router();
const body = 'body';
const query = 'query';
const params = 'params';

/** auth routes */
router.post('/auth', validator(schemas.AUTH, body), authController.authenticate);

/** user routes */
router.post('/users', validator(schemas.USER_CREATE, body), userController.createUser);

/** track routes */
router.get('/tracks', validator(schemas.TRACK_SEARCH, query), trackController.searchTracks);
router.get('/tracks/:id', validator(schemas.NUMBER_ID, params), trackController.getTrackById);

/** playlist routes */
router.get('/playlists', playlistController.getAllPublicPlaylistInfo);

module.exports = router;

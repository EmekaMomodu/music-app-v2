const express = require('express');
const validator = require("../util/validator/validator");
const schemas = require("../util/validator/schema");
const playlistController = require("../controller/playlist");

const router = express.Router();

const body = 'body';
const query = 'query';
const params = 'params';

/** playlist routes */
router.post('/playlists', validator(schemas.PLAYLIST_CREATE, body), playlistController.createPlaylist);


module.exports = router;

const express = require('express');
const playlistController = require('../controller/playlist');

const router = express.Router();

router.post('', playlistController.createPlaylist);

router.put('', playlistController.updatePlaylistByName);

router.get('/:id', playlistController.getPlaylistById);

router.delete('/:id', playlistController.deletePlaylistById);

router.get('', playlistController.getAllPlaylistInfo);

module.exports = router;
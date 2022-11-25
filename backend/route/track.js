const express = require('express');
const trackController = require('../controller/track');

const router = express.Router();

router.get('/:id', trackController.getTrackById);

router.get('', trackController.searchTracks);

module.exports = router;
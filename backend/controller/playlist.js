const Response = require('../dto/response');
const {MESSAGES, PLAYLIST_VISIBILITY} = require('../util/constant');
const playlistService = require('../service/playlist');

exports.createPlaylist = async (req, res, next) => {
    try {
        const playlist = await playlistService.createPlaylist(req.body, req.userId);
        const response = new Response(true, MESSAGES.DATA_CREATED_SUCCESSFULLY, playlist);
        res.status(201).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.updatePlaylist = async (req, res, next) => {
    try {
        const playlist = await playlistService.updatePlaylist(req.body, req.userId);
        const response = new Response(true, MESSAGES.DATA_UPDATED_SUCCESSFULLY, playlist);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.getPlaylistById = async (req, res, next) => {
    try {
        const playlist = await playlistService.getPlaylistById(req.params.id, req.userId, PLAYLIST_VISIBILITY.PRIVATE);
        const response = new Response(true, MESSAGES.DATA_FETCHED_SUCCESSFULLY, playlist);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.deletePlaylistById = async (req, res, next) => {
    try {
        await playlistService.deletePlaylistById(req.params.id, req.userId);
        const response = new Response(true, MESSAGES.DATA_DELETED_SUCCESSFULLY, req.params.id);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.getAllPlaylistInfo = async (req, res, next) => {
    try {
        const playlists = await playlistService.getAllPlaylistInfo(req.userId, PLAYLIST_VISIBILITY.PRIVATE);
        const response = new Response(true, MESSAGES.DATA_FETCHED_SUCCESSFULLY, playlists);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.getAllPublicPlaylistInfo = async (req, res, next) => {
    try {
        const playlists = await playlistService.getAllPlaylistInfo(undefined, PLAYLIST_VISIBILITY.PUBLIC);
        const response = new Response(true, MESSAGES.DATA_FETCHED_SUCCESSFULLY, playlists);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.getPublicPlaylistById = async (req, res, next) => {
    try {
        const playlist = await playlistService.getPlaylistById(req.params.id, undefined, PLAYLIST_VISIBILITY.PUBLIC);
        const response = new Response(true, MESSAGES.DATA_FETCHED_SUCCESSFULLY, playlist);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.createReviewForPublicPlaylist = async (req, res, next) => {
    try {
        const playlist = await playlistService.createReviewForPublicPlaylist(req.body, req.userId);
        const response = new Response(true, MESSAGES.DATA_CREATED_SUCCESSFULLY, playlist);
        res.status(201).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.updatePlaylistReviewHiddenFlag = async (req, res, next) => {
    try {
        const playlist = await playlistService.updatePlaylistReviewHiddenFlag(req.body);
        const response = new Response(true, MESSAGES.DATA_UPDATED_SUCCESSFULLY, playlist);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

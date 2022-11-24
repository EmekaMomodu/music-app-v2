const Response = require('../dto/response');
const {MESSAGES} = require('../util/constant');
const playlistService = require('../service/playlist');

exports.createPlaylist = async (req, res, next) => {
    try {
        const playlist = await playlistService.createPlaylist(req.body);
        const response = new Response(MESSAGES.DATA_CREATED_SUCCESSFULLY, playlist);
        res.status(201).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.updatePlaylistByName = async (req, res, next) => {
    try {
        const playlist = await playlistService.updatePlaylistByName(req.body);
        const response = new Response(MESSAGES.DATA_UPDATED_SUCCESSFULLY, playlist);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.getPlaylistById = async (req, res, next) => {
    try {
        const playlist = await playlistService.getPlaylistById(req.params.id);
        const response = new Response(MESSAGES.DATA_FETCHED_SUCCESSFULLY, playlist);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.deletePlaylistById = async (req, res, next) => {
    try {
        await playlistService.deletePlaylistById(req.params.id);
        const response = new Response(MESSAGES.DATA_DELETED_SUCCESSFULLY, req.params.id);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.getAllPlaylistInfo = async (req, res, next) => {
    try {
        const playlist = await playlistService.getAllPlaylistInfo();
        const response = new Response(MESSAGES.DATA_FETCHED_SUCCESSFULLY, playlist);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};
const Response = require('../dto/response');
const messages = require('../util/message');
const trackService = require("../service/track");

exports.getTrackById = async (req, res, next) => {
    try {
        const track = await trackService.getTrackById(req.params.id);
        const response = new Response(messages.DATA_FETCHED_SUCCESSFULLY, track);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.searchTracksByTitleOrAlbumOrArtist = async (req, res, next) => {
    const {searchText, maxNoOfRecords} = req.query;
    try {
        const tracks = await trackService.searchTracksByTitleOrAlbumOrArtist(searchText, maxNoOfRecords);
        const response = new Response(messages.DATA_FETCHED_SUCCESSFULLY, tracks);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};
const Response = require('../dto/response');
const {MESSAGES} = require('../util/constant');
const trackService = require("../service/track");

exports.getTrackById = async (req, res, next) => {
    try {
        const track = await trackService.getTrackById(req.params.id);
        const response = new Response(MESSAGES.DATA_FETCHED_SUCCESSFULLY, track);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.searchTracks = async (req, res, next) => {
    const {searchText, maxNoOfRecords} = req.query;
    try {
        const tracks = await trackService.searchTracks(searchText, maxNoOfRecords);
        const response = new Response(MESSAGES.DATA_FETCHED_SUCCESSFULLY, tracks);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};
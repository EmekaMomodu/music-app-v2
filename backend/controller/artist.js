const Response = require('../dto/response');
const {MESSAGES} = require('../util/constant');
const artistService = require('../service/artist');

exports.getArtistById = async (req, res, next) => {
    try {
        const artist = await artistService.getArtistById(req.params.id);
        const response = new Response(MESSAGES.DATA_FETCHED_SUCCESSFULLY, artist);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};

exports.searchArtistsByName = async (req, res, next) => {
    try {
        const artists = await artistService.searchArtistsByName(req.query.searchText);
        const response = new Response(MESSAGES.DATA_FETCHED_SUCCESSFULLY, artists);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }

};
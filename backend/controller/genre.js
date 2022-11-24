const Response = require('../dto/response');
const {MESSAGES} = require('../util/constant');
const genreService = require("../service/genre");

exports.getAllGenres = async (req, res, next) => {
    try {
        const genres = await genreService.getAllGenres();
        const response = new Response(MESSAGES.DATA_FETCHED_SUCCESSFULLY, genres);
        res.status(200).json(response);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
};
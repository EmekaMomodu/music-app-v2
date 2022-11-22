const messages = require('../util/message');
const Genre = require('../model/genre');
const GenreDto = require('../dto/genre');

exports.getAllGenres = async () => {

    const genres = await Genre.find().exec();

    if (!genres || !genres.length) {
        const error = new Error(messages.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }

    return genres.map((genre) => {
        return new GenreDto(genre.genre_id, genre.title, genre.parent);
    });

};
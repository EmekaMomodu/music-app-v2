const messages = require('../util/message');
const Artist = require('../model/artist');
const ArtistDto = require('../dto/artist');

exports.getArtistById = async (artistId) => {

    const artist = await Artist.findOne({artist_id: artistId}).exec();

    if (!artist) {
        const error = new Error(messages.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }

    return new ArtistDto(
        artist.artist_id || null,
        artist.artist_name || null,
        artist.artist_location || null,
        artist.artist_handle || null,
        artist.artist_contact || null,
        artist.artist_associated_labels || null,
        artist.artist_active_year_begin || null
    );

};

exports.searchArtistsByName = async (searchText) => {

    if (!searchText) {
        const error = new Error(messages.ONE_OR_MORE_REQUIRED_REQUEST_PARAMETERS_ARE_MISSING_OR_INVALID);
        error.statusCode = 400;
        throw error;
    }

    const artists = await Artist.find({artist_name: {$regex: '.*' + searchText + '.*', $options: 'i'}}).exec();

    if (!artists || !artists.length) {
        const error = new Error(messages.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }

    return artists.map((artist) => {
        return new ArtistDto(
            artist.artist_id || null,
            artist.artist_name || null,
            artist.artist_location || null,
            artist.artist_handle || null,
            artist.artist_contact || null,
            artist.artist_associated_labels || null,
            artist.artist_active_year_begin || null
        );
    });

};
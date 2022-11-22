const messages = require('../util/message');
const Track = require('../model/track');
const TrackDto = require('../dto/track');

exports.getTrackById = async (trackId) => {

    const track = await Track.findOne({track_id: trackId}).exec();

    if (!track) {
        const error = new Error(messages.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }

    return new TrackDto(
        track.track_id || null,
        track.album_id || null,
        track.album_title || null,
        track.artist_id || null,
        track.artist_name || null,
        track.tags || null,
        track.track_date_created || null,
        track.track_date_recorded || null,
        track.track_duration || null,
        track.track_genres || null,
        track.track_number || null,
        track.track_title || null
    );
};

exports.searchTracksByTitleOrAlbumOrArtist = async (searchText, maxNoOfRecords) => {

    if (!searchText || !maxNoOfRecords || !/^\+?([1-9]\d*)$/.test(maxNoOfRecords)) {
        const error = new Error(messages.ONE_OR_MORE_REQUIRED_REQUEST_PARAMETERS_ARE_MISSING_OR_INVALID);
        error.statusCode = 400;
        throw error;
    }

    const tracks = await Track.find({
        $or: [
            {album_title: {$regex: '.*' + searchText + '.*', $options: 'i'}},
            {track_title: {$regex: '.*' + searchText + '.*', $options: 'i'}},
            {artist_name: {$regex: '.*' + searchText + '.*', $options: 'i'}}
        ]
    }).limit(maxNoOfRecords).exec();

    if (!tracks || !tracks.length) {
        const error = new Error(messages.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }

    return tracks.map((track) => {
        return new TrackDto(
            track.track_id || null,
            track.album_id || null,
            track.album_title || null,
            track.artist_id || null,
            track.artist_name || null,
            track.tags || null,
            track.track_date_created || null,
            track.track_date_recorded || null,
            track.track_duration || null,
            track.track_genres || null,
            track.track_number || null,
            track.track_title || null
        );
    });

};
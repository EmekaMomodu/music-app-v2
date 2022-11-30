const {MESSAGES} = require('../util/constant');
const Track = require('../model/track');
const TrackDto = require('../dto/track');

exports.getTrackById = async (trackId) => {

    const track = await Track.findOne({track_id: trackId}).exec();

    if (!track) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
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

exports.searchTracks = async (searchText, maxNoOfRecords) => {

    const tracks = await Track.find({
        $or: [
            {album_title: {$regex: '.*' + searchText + '.*', $options: 'i'}},
            {track_title: {$regex: '.*' + searchText + '.*', $options: 'i'}},
            {artist_name: {$regex: '.*' + searchText + '.*', $options: 'i'}},
            {'track_genres.genre_title': {$regex: '.*' + searchText + '.*', $options: 'i'}}
        ]
    }).limit(maxNoOfRecords).exec();

    if (!tracks || !tracks.length) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
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

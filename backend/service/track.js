const {MESSAGES} = require('../util/constant');
const Track = require('../model/track');
const TrackDto = require('../dto/track');

exports.getTrackById = async (trackId) => {
    // find track by id
    const track = await Track.findOne({track_id: trackId}).exec();
    // throw exception if no track was found
    if (!track) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    // return found track mapped to dto
    return new TrackDto(track);
};

exports.searchTracks = async (searchText, maxNoOfRecords) => {
    // find track by title or album or artist or genre and limit record to maxNoOfRecords
    const tracks = await Track.find({
        $or: [
            {album_title: {$regex: '.*' + searchText + '.*', $options: 'i'}},
            {track_title: {$regex: '.*' + searchText + '.*', $options: 'i'}},
            {artist_name: {$regex: '.*' + searchText + '.*', $options: 'i'}},
            {'track_genres.genre_title': {$regex: '.*' + searchText + '.*', $options: 'i'}}
        ]
    }).limit(maxNoOfRecords).exec();
    // if no tracks found, throw exception
    if (!tracks || !tracks.length) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    // return found tracks
    return tracks.map((track) => {
        return new TrackDto(track);
    });
};

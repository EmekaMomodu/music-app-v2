const {MESSAGES} = require('../util/constant');
const Playlist = require('../model/playlist');
const Track = require('../model/track');
const TrackDto = require("../dto/track");
const PlaylistDto = require('../dto/playlist');
const userService = require("./user");

exports.createPlaylist = async (playlist, userId) => {
    // find if name already exists throw error if yes
    const existingPlaylist = await Playlist.findOne({name: {$regex: '^' + playlist.name + '$', $options: 'i'}}).exec();
    // throw exception if playlist exists
    if (existingPlaylist) {
        const error = new Error(MESSAGES.PLAYLIST_NAME_ALREADY_EXISTS);
        error.statusCode = 400;
        throw error;
    }
    // traverse track list and find if trackIds exist in track collection and get full track details, append to new list
    let existingTrack;
    let tracks = [];
    for (let trackId of playlist.trackIds) {
        existingTrack = await Track.findOne({track_id: trackId}).exec();
        if (!existingTrack) {
            const error = new Error(MESSAGES.ONE_OR_MORE_IDS_ARE_INVALID);
            error.statusCode = 400;
            throw error;
        }
        tracks.push(existingTrack);
    }
    playlist.tracks = tracks;
    // get user creating the playlist and set as playlist creator
    playlist.creator = await userService.getUserById(userId);
    // save playlist to database
    const savedPlaylist = await new Playlist(playlist).save();
    if (!savedPlaylist) {
        const error = new Error(MESSAGES.UNABLE_TO_SAVE_DATA);
        error.statusCode = 500;
        throw error;
    }
    // return savedPlaylist
    return new PlaylistDto(savedPlaylist);
};

exports.updatePlaylist = async (playlist, userId) => {
    // find playlist by id
    const playlistToUpdate = await Playlist.findById(playlist.id).exec();
    // throw exception if playlist does not exist
    if (!playlistToUpdate) {
        const error = new Error(MESSAGES.PLAYLIST_DOES_NOT_EXIST);
        error.statusCode = 400;
        throw error;
    }
    // ensure user is owner of the playlist
    if (playlistToUpdate.creator.id !== userId) {
        const error = new Error(MESSAGES.UNAUTHORIZED_ONLY_PLAYLIST_CREATOR_CAN_PERFORM_THIS_ACTION);
        error.statusCode = 401;
        throw error;
    }
    // check if new name is different from old name
    if (playlistToUpdate.name !== playlist.name) {
        // find if name already exists throw error if yes
        const foundPlaylist = await Playlist.findOne({name: {$regex: '^' + playlist.name + '$', $options: 'i'}}).exec();
        // throw exception if playlist exists
        if (foundPlaylist) {
            const error = new Error(MESSAGES.PLAYLIST_NAME_ALREADY_EXISTS);
            error.statusCode = 400;
            throw error;
        }
        playlistToUpdate.name = playlist.name;
    }
    // update description
    playlistToUpdate.description = playlist.description;
    // traverse track list and find if trackIds exist in track collection and get full track details, append to new list
    let existingTrack;
    let tracks = [];
    for (let trackId of playlist.trackIds) {
        existingTrack = await Track.findOne({track_id: trackId}).exec();
        if (!existingTrack) {
            const error = new Error(MESSAGES.ONE_OR_MORE_IDS_ARE_INVALID);
            error.statusCode = 400;
            throw error;
        }
        tracks.push(existingTrack);
    }
    // update tracks
    playlistToUpdate.tracks = tracks;
    // update visibility
    playlistToUpdate.visibility = playlist.visibility;
    // update last_modified_at
    playlistToUpdate.last_modified_at = new Date();
    // save to database
    const updatedPlaylist = await playlistToUpdate.save();
    if (!updatedPlaylist) {
        const error = new Error(MESSAGES.UNABLE_TO_UPDATE_DATA);
        error.statusCode = 500;
        throw error;
    }
    // return updatedPlaylist
    return new PlaylistDto(updatedPlaylist);
};

exports.getPlaylistById = async (id) => {
    const playlist = await Playlist.findById(id).exec();

    if (!playlist) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }

    const tracksDto = playlist.tracks.map((track) => {
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

    return new PlaylistDto(playlist._id, playlist.name, tracksDto);

};

exports.deletePlaylistById = async (id) => {
    // find if id does not exist and throw error if yes
    const existingPlaylist = await Playlist.findById(id).exec();

    if (!existingPlaylist) {
        const error = new Error(MESSAGES.PLAYLIST_DOES_NOT_EXIST);
        error.statusCode = 404;
        throw error;
    }

    await Playlist.deleteOne({_id: id}).exec();
};

exports.getAllPlaylistInfo = async () => {

    const playlists = await Playlist.find().exec();

    console.log("playlists ::: " + playlists);

    if (!playlists || !playlists.length) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }

    // traverse playlist
    // create object with name, tracks length, traverse tracks and calculate total play time
    const result = [];
    for (let playlist of playlists) {
        const item = {};
        item.id = playlist._id;
        item.name = playlist.name;
        item.numberOfTracks = playlist.tracks.length;
        let totalPlayTime = 0;
        let trackDurationList;
        let trackDuration;
        for (let track of playlist.tracks) {
            if (!track.track_duration) continue;
            trackDurationList = track.track_duration.split(':');
            trackDuration = (Number(trackDurationList[0]) * 60) + Number(trackDurationList[1]);
            totalPlayTime += trackDuration
        }
        let totalMinutes = Math.floor(totalPlayTime / 60);
        let totalSeconds = totalPlayTime - (totalMinutes * 60);

        item.totalPlayTime = stringPadLeft(totalMinutes, '0', 2) + ':' + stringPadLeft(totalSeconds, '0', 2);

        result.push(item);
    }

    return result;

};

const stringPadLeft = (string, pad, length) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

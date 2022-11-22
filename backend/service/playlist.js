const messages = require('../util/message');
const Playlist = require('../model/playlist');
const Track = require('../model/track');
const TrackDto = require("../dto/track");
const PlaylistDto = require('../dto/playlist');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createPlaylist = async (playlist) => {

    let {name, trackIds} = playlist;

    if (!name || !trackIds || !trackIds.length) {
        const error = new Error(messages.ONE_OR_MORE_REQUIRED_REQUEST_PARAMETERS_ARE_MISSING_OR_INVALID);
        error.statusCode = 400;
        throw error;
    }

    name = name.trim();

    // find if name already exists throw error if yes
    const existingPlaylist = await Playlist.findOne({name: {$regex: '^' + name + '$', $options: 'i'}}).exec();

    if (existingPlaylist) {
        const error = new Error(messages.PLAYLIST_NAME_ALREADY_EXISTS);
        error.statusCode = 400;
        throw error;
    }

    // traverse track list and find if trackIds exist in track collection and get full track details, append to new list
    let existingTrack;
    let tracks = [];
    for (let trackId of trackIds) {
        existingTrack = await Track.findOne({track_id: trackId}).exec();
        if (!existingTrack) {
            const error = new Error(messages.ONE_OR_MORE_IDS_ARE_INVALID);
            error.statusCode = 400;
            throw error;
        }
        tracks.push(existingTrack);
    }

    const savedPlaylist = await new Playlist({name: name, tracks: tracks}).save();

    if (!savedPlaylist) {
        const error = new Error(messages.UNABLE_TO_SAVE_DATA);
        error.statusCode = 500;
        throw error;
    }

    const tracksDto = savedPlaylist.tracks.map((track) => {
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

    return new PlaylistDto(savedPlaylist._id, savedPlaylist.name, tracksDto);

};

exports.updatePlaylistByName = async (playlist) => {

    let {name, trackIds} = playlist;

    if (!name || !trackIds || !trackIds.length) {
        const error = new Error(messages.ONE_OR_MORE_REQUIRED_REQUEST_PARAMETERS_ARE_MISSING_OR_INVALID);
        error.statusCode = 400;
        throw error;
    }

    name = name.trim();

    // find if name does not exist and throw error if yes
    const existingPlaylist = await Playlist.findOne({name: {$regex: '^' + name + '$', $options: 'i'}}).exec();

    if (!existingPlaylist) {
        const error = new Error(messages.PLAYLIST_NAME_DOES_NOT_EXIST);
        error.statusCode = 400;
        throw error;
    }

    // traverse track list and find if trackIds exist in track collection and get full track details, append to new list
    let existingTrack;
    let tracks = [];
    for (let trackId of trackIds) {
        existingTrack = await Track.findOne({track_id: trackId}).exec();
        if (!existingTrack) {
            const error = new Error(messages.ONE_OR_MORE_IDS_ARE_INVALID);
            error.statusCode = 400;
            throw error;
        }
        tracks.push(existingTrack);
    }

    existingPlaylist.tracks = tracks;

    const updatedPlaylist = await existingPlaylist.save();

    if (!updatedPlaylist) {
        const error = new Error(messages.UNABLE_TO_UPDATE_DATA);
        error.statusCode = 500;
        throw error;
    }

    const tracksDto = updatedPlaylist.tracks.map((track) => {
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

    return new PlaylistDto(updatedPlaylist._id, updatedPlaylist.name, tracksDto);

};

exports.getPlaylistById = async (id) => {

    if (!ObjectId.isValid(id)) {
        const error = new Error(messages.INVALID_ID);
        error.statusCode = 400;
        throw error;
    }

    const playlist = await Playlist.findById(id).exec();

    if (!playlist) {
        const error = new Error(messages.NO_DATA_FOUND);
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

    if (!ObjectId.isValid(id)) {
        const error = new Error(messages.INVALID_ID);
        error.statusCode = 400;
        throw error;
    }

    // find if id does not exist and throw error if yes
    const existingPlaylist = await Playlist.findById(id).exec();

    if (!existingPlaylist) {
        const error = new Error(messages.PLAYLIST_DOES_NOT_EXIST);
        error.statusCode = 404;
        throw error;
    }

    await Playlist.deleteOne({_id: id}).exec();
};

exports.getAllPlaylistInfo = async () => {

    const playlists = await Playlist.find().exec();

    console.log("playlists ::: " + playlists);

    if (!playlists || !playlists.length) {
        const error = new Error(messages.NO_DATA_FOUND);
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
const {MESSAGES, PLAYLIST_VISIBILITY} = require('../util/constant');
const Playlist = require('../model/playlist');
const Track = require('../model/track');
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

exports.getPlaylistById = async (playlistId, userId, visibility) => {
    // initialise playlist
    let playlist;
    // check visibility to determine query
    // if private, find playlist with provided ID that matches userId as the creator
    if (visibility === PLAYLIST_VISIBILITY.PRIVATE) playlist = await Playlist.findOne({
        _id: playlistId,
        'creator.id': userId
    }).exec();
    // else if visibility is public get public playlist
    else if (visibility === PLAYLIST_VISIBILITY.PUBLIC) playlist = await Playlist.findOne({
        _id: playlistId,
        visibility: PLAYLIST_VISIBILITY.PUBLIC
    }).exec();
    // throw exception if no playlist found
    if (!playlist) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    // return found playlist
    return new PlaylistDto(playlist);
};

exports.deletePlaylistById = async (playlistId, userId) => {
    // find if playlistId does not exist and throw error if yes
    const playlistToDelete = await Playlist.findById(playlistId).exec();
    if (!playlistToDelete) {
        const error = new Error(MESSAGES.PLAYLIST_DOES_NOT_EXIST);
        error.statusCode = 404;
        throw error;
    }
    // ensure user is owner of the playlist
    if (playlistToDelete.creator.id !== userId) {
        const error = new Error(MESSAGES.UNAUTHORIZED_ONLY_PLAYLIST_CREATOR_CAN_PERFORM_THIS_ACTION);
        error.statusCode = 401;
        throw error;
    }
    await Playlist.deleteOne({_id: playlistToDelete.id}).exec();
};

exports.getAllPlaylistInfo = async (userId, visibility) => {
    // initialise playlists
    let playlists;
    // check visibility to determine query
    // if private, find all playlists created by currently logged-in user
    if (visibility === PLAYLIST_VISIBILITY.PRIVATE) playlists = await Playlist.find({'creator.id': userId}).exec();
    // else if visibility is public get public playlist
    else if (visibility === PLAYLIST_VISIBILITY.PUBLIC) playlists = await Playlist.find({visibility: PLAYLIST_VISIBILITY.PUBLIC}).exec();
    // throw exception if no playlist was found
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
        item.description = playlist.description || null;
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
        // beautify minutes and seconds with zero padding to the left
        item.totalPlayTime =
            stringPadLeft(totalMinutes, '0', 2) + ':' + stringPadLeft(totalSeconds, '0', 2);
        item.visibility = playlist.visibility;
        item.creator = playlist.creator;
        item.lastModifiedAt = playlist.last_modified_at;
        result.push(item);
    }
    return result;
};

exports.createReviewForPublicPlaylist = async (requestBody, userId) => {
    const {comment, playlistId} = requestBody;
    // find playlist with provided ID
    const playlist = await Playlist.findById(playlistId).exec();
    // throw exception if no playlist found
    if (!playlist) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    // throw exception if playlist visibility is not public
    if (playlist.visibility !== PLAYLIST_VISIBILITY.PUBLIC) {
        const error = new Error(MESSAGES.PLAYLIST_VISIBILITY_IS_NOT_PUBLIC);
        error.statusCode = 400;
        throw error;
    }
    let user;
    // get user by id
    try {
        user = await userService.getUserById(userId);
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        throw error;
    }
    // create a new review object having fields => comment and creator {id, email, name}
    const review = {
        comment: comment,
        creator: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    }
    // push new review to reviews of playlist
    playlist.reviews.push(review);
    // save to database
    const updatedPlaylist = await playlist.save();
    if (!updatedPlaylist) {
        const error = new Error(MESSAGES.UNABLE_TO_UPDATE_DATA);
        error.statusCode = 500;
        throw error;
    }
    // return updatedPlaylist
    return new PlaylistDto(updatedPlaylist);
};

exports.updatePlaylistReviewHiddenFlag = async (requestBody) => {
    const {playlistId, reviewId, hiddenFlag} = requestBody;
    // find playlist by id
    const playlist = await Playlist.findById(playlistId);
    // throw exception if playlist not found
    if (!playlist) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    let reviewNotfound = true;
    // traverse reviews on playlist and update hidden flag for review matching review id
    for (let review of playlist.reviews) {
        if (review._id.toString() === reviewId) {
            review.hidden_flag = hiddenFlag;
            reviewNotfound = false;
            break;
        }
    }
    // throw exception if review not found
    if (reviewNotfound) {
        const error = new Error(MESSAGES.NO_DATA_FOUND);
        error.statusCode = 404;
        throw error;
    }
    // save playlist
    const updatedPlaylist = await playlist.save();
    // return playlist
    return new PlaylistDto(updatedPlaylist);
};

const stringPadLeft = (string, pad, length) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

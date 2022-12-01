const TrackDto = require("../dto/track");
const ReviewDto = require('../dto/review');

class Playlist {
    constructor(playlist) {
        this.id = playlist._id;
        this.name = playlist.name;
        this.description = playlist.description || null;
        this.tracks = playlist.tracks.map((track) => {
            return new TrackDto(track);
        });
        this.visibility = playlist.visibility;
        this.reviews = (playlist.reviews && playlist.reviews.map((review) => {
            return new ReviewDto(review);
        })) || [];
        this.creator = playlist.creator;
        this.lastModifiedAt = playlist.last_modified_at;
    }
}

module.exports = Playlist;

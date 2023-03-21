class Track {
    constructor(track) {
        this.id = track.track_id || null;
        this.albumId = track.album_id || null;
        this.albumTitle = track.album_title || null;
        this.artistId = track.artist_id || null;
        this.artistName = track.artist_name || null;
        this.tags = track.tags || null;
        this.dateCreated = track.track_date_created || null;
        this.dateRecorded = track.track_date_recorded || null;
        this.duration = track.track_duration || null;
        this.genres = (track.track_genres && track.track_genres.map((genre) => {
            return genre.genre_title || null
        })) || null;
        this.number = track.track_number || null;
        this.title = track.track_title || null;
    }
}

module.exports = Track;

class Track {
    constructor(id,
                albumId,
                albumTitle,
                artistId,
                artistName,
                tags,
                dateCreated,
                dateRecorded,
                duration,
                genres,
                number,
                title) {
        this.id = id;
        this.albumId = albumId;
        this.albumTitle = albumTitle;
        this.artistId = artistId;
        this.artistName = artistName;
        this.tags = tags;
        this.dateCreated = dateCreated;
        this.dateRecorded = dateRecorded;
        this.duration = duration;
        this.genres = genres.map((genre) => {
            return genre.genre_title || null
        });
        this.number = number;
        this.title = title;
    }
}

module.exports = Track;
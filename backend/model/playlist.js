const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema(
    {
        name: {
            type: String,
            index: {unique: true}
        },
        description: {
            type: String
        },
        tracks: [
            {
                track_id: {
                    type: Number
                },
                album_id: {
                    type: Number
                },
                album_title: {
                    type: String
                },
                artist_id: {
                    type: Number,
                },
                artist_name: {
                    type: String,
                },
                tags: {
                    type: String,
                },
                track_date_created: {
                    type: Date,
                },
                track_date_recorded: {
                    type: Date,
                },
                track_duration: {
                    type: String,
                },
                track_genres: {
                    type: String,
                },
                track_number: {
                    type: Number,
                },
                track_title: {
                    type: String
                }
            }
        ],
        visibility: {
            type: String
        },
        reviews: [{
            comment: {
                type: String
            },
            hidden_flag: {
                type: String
            }
        }],
        created_by: {
            type: String
        },
        created_at: {
            type: Date
        },
        modified_by: {
            type: String
        },
        modified_at: {
            type: Date
        }
    }
);

module.exports = mongoose.model('Playlist', playlistSchema);

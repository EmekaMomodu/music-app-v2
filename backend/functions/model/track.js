const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackSchema = new Schema(
    {
        track_id: {
            type: Number,
            index: true
        },
        album_id: {
            type: Number
        },
        album_title: {
            type: String,
            index: true
        },
        artist_id: {
            type: Number,
        },
        artist_name: {
            type: String,
            index: true
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
        track_genres: [
            {
                genre_id: {
                    type: Number
                },
                genre_title: {
                    type: String,
                    index: true
                },
                genre_url: {
                    type: String
                }
            }
        ],
        track_number: {
            type: Number,
        },
        track_title: {
            type: String,
            index: true
        }
    }
);

module.exports = mongoose.model('Track', trackSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genreSchema = new Schema(
    {
        genre_id: {
            type: Number,
        },
        title: {
            type: String,
        },
        parent: {
            type: Number,
        }
    }
);

module.exports = mongoose.model('Genre', genreSchema);
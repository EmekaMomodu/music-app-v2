const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema(
    {
        artist_id: {
            type: Number,
            index: true
        },
        artist_name: {
            type: String,
            index: true
        },
        artist_location: {
            type: String,
        },
        artist_handle: {
            type: String,
        },
        artist_contact: {
            type: String,
        },
        artist_associated_labels: {
            type: String,
        },
        artist_active_year_begin: {
            type: Number,
        }
    }
);

module.exports = mongoose.model('Artist', artistSchema);
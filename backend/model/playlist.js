const mongoose = require('mongoose');
const {BINARY_FLAG, PLAYLIST_VISIBILITY} = require('../util/constant');

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
                    type: String
                }
            }
        ],
        visibility: {
            type: String,
            default: PLAYLIST_VISIBILITY.PRIVATE
        },
        reviews: [{
            comment: {
                type: String
            },
            creator: {
                id: {
                    type: String
                },
                // email: {
                //     type: String
                // },
                name: {
                    type: String
                }
            },
            created_at: {
                type: Date,
                default: Date.now
            },
            hidden_flag: {
                type: String,
                default: BINARY_FLAG.NO
            }
        }],
        creator: {
            id: {
                type: String,
                index: true
            },
            // email: {
            //     type: String
            // },
            name: {
                type: String
            }
        },
        last_modified_at: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('Playlist', playlistSchema);

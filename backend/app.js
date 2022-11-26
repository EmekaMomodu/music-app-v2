const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Response = require('./dto/response');
const genreRoutes = require('./route/genre');
const artistRoutes = require('./route/artist');
const trackRoutes = require('./route/track');
const playlistRoutes = require('./route/playlist');

const app = express();
const pathPrefix = '/api';

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(`${pathPrefix}/genres`, genreRoutes);

app.use(`${pathPrefix}/artists`, artistRoutes);

app.use(`${pathPrefix}/tracks`, trackRoutes);

app.use(`${pathPrefix}/playlists`, playlistRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const response = new Response(message, null);
    res.status(status).json(response);
});

module.exports = app;

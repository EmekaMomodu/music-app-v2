const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Response = require('./dto/response');
const genreRoutes = require('./route/genre');
const artistRoutes = require('./route/artist');
const trackRoutes = require('./route/track');
const playlistRoutes = require('./route/playlist');

const app = express();
const port = 3001;
const databaseConnectionUrl = 'mongodb+srv://ece9065:ece9065@cluster0.zry6vyf.mongodb.net/?retryWrites=true&w=majority';
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

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const response = new Response(message, null);
    res.status(status).json(response);
});

mongoose.connect(databaseConnectionUrl)
    .then(result => {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        });
    })
    .catch(err => console.log(err));


const express = require('express');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const Response = require('./dto/response');
const openRoutes = require('./route/open');
const secureRoutes = require('./route/secure');
const adminRoutes = require('./route/admin');
const helmet = require('helmet');
const validateJwtForSecureRoutes = require('./util/security');

const app = express();
const pathPrefix = '/api';

app.use(bodyParser.json());

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// Set security HTTP headers
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(validateJwtForSecureRoutes);

app.use(`${pathPrefix}/open`, openRoutes);

app.use(`${pathPrefix}/secure`, secureRoutes);

app.use(`${pathPrefix}/admin`, adminRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const response = new Response(message, null);
    res.status(status).json(response);
});

module.exports = app;

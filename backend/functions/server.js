// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
//
// dotenv.config({path: './config.env'});
// const app = require('./index');
//
// const serverPort = process.env.SERVER_PORT;
// const databaseConnectionUrl = process.env.DATABASE_CONNECTION_URL;
//
// mongoose.connect(databaseConnectionUrl)
//     .then((result) => {
//         app.listen(serverPort, () => {
//             console.log(`App listening on port ${serverPort}`)
//         });
//     })
//     .catch((error) => {
//         console.log('Failed to connect to database');
//         console.log(error);
//     });

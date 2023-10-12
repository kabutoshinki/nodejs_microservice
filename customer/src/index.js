// const express = require('express');
// const { PORT } = require('./config');
// const { databaseConnection } = require('./database');
// const expressApp = require('./express-app');

// const StartServer = async() => {

//     const app = express();

//     await databaseConnection();

//     await expressApp(app);

//     app.listen(PORT, () => {
//         console.log(`listening to port ${PORT}`);
//     })
//     .on('error', (err) => {
//         console.log(err);
//         process.exit();
//     })
// }

// StartServer();

const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");
const StartServer = async () => {
  const app = express();

  await databaseConnection();

  const channel = await CreateChannel();
  await expressApp(app, channel);

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

process.env.APP_SECRET = "jg_youtube_tutorial";

// Mongo DB
process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/amazon_demo";

// Port
process.env.PORT = 8004;

StartServer();

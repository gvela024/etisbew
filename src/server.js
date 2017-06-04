'use strict';

const express = require('express');
const Server = require('http').Server;
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const secure = require('express-sslify');
const helmet = require('helmet');

const SensorModel = require('./sensor/Model');

const localEnvironment = 'mongodb://localhost/test';

module.exports = {
  start: (output) => {
    const app = express();
    const http = Server(app);
    const io = socketIo(http);

    const databaseUri = process.env.MONGODB_URI || localEnvironment;
    if (databaseUri !== localEnvironment) {
      const secondsInYear = 31557600
      app.use(helmet.hsts({
        maxAge: secondsInYear,
        force: true,
        preload: true
      }));

      app.use(helmet.frameguard({
        action: 'deny'
      }));

      app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        next();
      });

      app.use((req, res, next) => {
        res.setHeader(`Content-Security-Policy`, "default-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'");
        next();
      });

      app.use(helmet.xssFilter());

      app.use(secure.HTTPS({
        trustProtoHeader: true
      }));
    }
    app.use(express.static(path.join(__dirname, 'static'), {
      extensions: ['html', 'js', 'jsx']
    }));
    app.use(bodyParser.json());

    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUri);
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.once('open', () => {
      SensorModel(io, mongoose);

      const port = process.env.PORT || 3001;
      http.listen(port, function() {
        output('Running on ' + port);
      });
    });
  }
};

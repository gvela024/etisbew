'use strict';

const express = require('express');
const Server = require('http').Server;
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const SensorModel = require('./sensor/Model');

module.exports = {
  start: (output) => {
    const app = express();
    const http = Server(app);
    const io = socketIo(http);

    app.use(express.static(path.join(__dirname, 'static'), {
      extensions: ['html', 'js', 'jsx']
    }));
    app.use(bodyParser.json());

    const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/test';
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

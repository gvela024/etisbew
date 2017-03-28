'use strict';

const express = require('express');
const Server = require('http').Server;
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const SensorModel = require('./sensor/Model');

module.exports = {
  start: () => {
    const app = express();
    const http = Server(app);
    const io = socketIo(http);

    app.use(express.static(path.join(__dirname, 'static'), {
      extensions: ['html', 'js', 'jsx']
    }));
    app.use(bodyParser.json());

    SensorModel(io);

    // io.on('connect', () => {
    //   io.emit('testing');
    // });

    const port = process.env.PORT || 3001;
    http.listen(port, function() {
      console.log('Running on ' + port);
      // io.emit('testing');
    });
  }
};

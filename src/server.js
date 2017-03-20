'use strict';

const express = require('express');
const io = require('socket.io');
const Server = require('http').Server;
const bodyParser = require('body-parser');
const SensorModel = require('./sensor/SensorModel');
const path = require('path');

module.exports = {
  start: () => {
    const app = express();
    const server = {
      http: Server(app)
    };

    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use

    app.get('/', function(request, response) {
      response.sendFile(__dirname + '/index.html');
    });
    app.use(express.static(__dirname + '/sensor'));
    app.use(express.static(__dirname + '/build'));
    const core = {
      io: io(server.http)
    };
    const sensorModel = new SensorModel(core.io.of('/sensors'));

    const port = process.env.PORT || 3000;
    app.listen(port, function() {
      console.log('Running on ' + port);
    });
  }
};

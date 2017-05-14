'use strict';

const express = require('express');
const Server = require('http').Server;
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const SensorModel = require('./sensor/Model');

const localEnvironment = 'mongodb://localhost/test';

module.exports = {
  start: (output) => {
    const app = express();
    const http = Server(app);
    const io = socketIo(http);

    const databaseUri = process.env.MONGODB_URI || localEnvironment;
    if (databaseUri !== localEnvironment) {
      console.log(databaseUri);
      app.use((request, response, next) => {
        console.log('secure? ', request.secure);
        let isHttps = request.secure;

        if (!isHttps) {
          console.log('request.headers: ', request.headers);
          console.log('x-forwarded-proto', request.headers["x-forwarded-proto"]);
          isHttps = ((request.headers["x-forwarded-proto"] || '').substring(0, 5) === 'https');
        }

        if (isHttps) {
          console.log('is https');
          next();
        } else {
          // Only redirect GET methods
          if (request.method === "GET" || request.method === 'HEAD') {
            console.log('is a GET')
              // var host = options.trustXForwardedHostHeader ? (request.headers['x-forwarded-host'] || request.headers.host) : request.headers.host;
            var host = request.headers.host;
            console.log('host', host);
            console.log('originalUrl:', request.originalUrl);
            response.redirect(301, "https://" + host + request.originalUrl);
          } else {
            response.status(403).send("Please use HTTPS when submitting data to this server.");
          }
        }
      });
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

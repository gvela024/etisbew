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

      // app.use((req, res, next) => {
      //   res.setHeader(`Content-Security-Policy`,
      //     "default-src 'none'; " +
      //     "img-src 'self'; " +
      //     "script-src 'self' https://www.gstatic.com/charts/loader.js; " +
      //     "connect-src 'self'; wss://etisbew.herokuapp.com/socket.io" +
      //     "font-src 'self' " +
      //     "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/fonts/glyphicons-halflings-regular.woff2 " +
      //     "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/fonts/glyphicons-halflings-regular.woff " +
      //     "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/fonts/glyphicons-halflings-regular.ttf " +
      //     "; " +
      //     "style-src 'self' https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css");
      //   next();
      // });

      app.use(helmet.csp({
        defaultSrc: ["'none'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.gstatic.com/charts/loader.js"
        ],
        styleSrc: [
          "'self'",
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        ],
        fontSrc: [
          "'self'",
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/fonts/glyphicons-halflings-regular.woff2",
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/fonts/glyphicons-halflings-regular.woff",
          "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/fonts/glyphicons-halflings-regular.ttf"
        ],
        imgSrc: ["'self'", 'data:'],
        reportUri: '/report-violation',
        objectSrc: ["'none'"],
        connectSrc: [
          "'self'",
          "wss://etisbew.herokuapp.com/socket.io"
        ]
        upgradeInsecureRequests: true
      }));
      app.use(bodyParser.json({
        type: ['json', 'application/csp-report']
      }));
      app.post('/report-violation', function(req, res) {
        if (req.body) {
          console.log('CSP Violation: ', req.body)
        } else {
          console.log('CSP Violation: No data received!')
        }
        res.status(204).end()
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

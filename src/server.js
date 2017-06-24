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
const WhiteList = require('./sensor/WhiteList');

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

      app.use(helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'none'"],
          scriptSrc: [
            "'self'",
            "https://www.gstatic.com/charts/45.1/js/jsapi_compiled_corechart_module.js",
            "https://www.gstatic.com/charts/45.1/js/jsapi_compiled_default_module.js",
            "https://www.gstatic.com/charts/45.1/js/jsapi_compiled_format_module.js",
            "https://www.gstatic.com/charts/45.1/js/jsapi_compiled_ui_module.js",
            "https://www.gstatic.com/charts/45.1/loader.js",
            "https://www.gstatic.com/charts/loader.js"
          ],
          styleSrc: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/",
            "https://www.gstatic.com/charts/45.1/css/core/",
            "https://www.gstatic.com/charts/45.1/css/util/",
          ],
          fontSrc: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/fonts/",
          ],
          reportUri: '/report-violation',
          connectSrc: [
            "'self'",
            "wss://etisbew.herokuapp.com"
          ],
          upgradeInsecureRequests: true
        }
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
      const sensorModel = SensorModel(io, mongoose);
      const whiteList = WhiteList(io, sensorModel);

      const port = process.env.PORT || 3001;
      http.listen(port, function() {
        output('Running on ' + port);
      });
    });
  }
};

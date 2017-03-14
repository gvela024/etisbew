global.base_dir = __dirname;
global.absolute_path = function(path) {
  return base_dir + path;
}
global.include = function(file) {
  return require(absolute_path('/' + file));
}

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var db = include('app/server/config/db');
mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(absolute_path('/app/client')));
include('app/server/routes/temp_route')(app); // configure our routes

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;

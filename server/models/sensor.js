var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  id: Number,
  location: {
    latitude: Number,
    longitude: Number
  },
  reading: [{
    temperature: Number,
    humidity: Number,
    relative_humidity: Number,
    date: Date,
    minutes: Number
  }]
});
module.exports = mongoose.model('sensor', schema);

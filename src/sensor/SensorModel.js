'use strict';

const EventEmitter = require('events').EventEmitter;

module.exports = class SensorModel extends EventEmitter {
  constructor(model) {
    super();

    this.sensors = [];

    model.on('newSensorCreated', (sensor) => {
      this._updateList(sensor);
    });
  }

  _updateList(sensor) {
    const timestamp = new Date();
    this.sensors.push({
      id: sensor.id,
      description: sensor.description,
      location: {
        latitude: sensor.location.latitude,
        longitude: sensor.location.longitude
      },
      readings: [{
        temperature: sensor.readings[0].temperature,
        relativeHumidity: sensor.readings[0].relativeHumidity,
        timestamp: timestamp
      }]
    });

    this._publishUpdate();
  }

  _publishUpdate() {
    console.log(this.sensors[0]);
    this.emit('sensorListUpdated', this.sensors);
  }

  getSensorList() {
    return this.sensors;
  }
}

'use strict';

describe('app.frontend.src.sensor.create', () => {
  const EventEmitter = require('events').EventEmitter;
  const SensorModel = require('../../src/sensor/SensorModel')

  let model;
  let sensorModel;
  let sensorsDouble;
  let sensorListDouble = (sensors) => {
    sensorsDouble = sensors
  };

  const someSensors = [{
    id: 1234,
    description: 'the description',
    location: {
      latitude: 12.34,
      longitude: 12.34
    },
    readings: [{
      temperature: 1,
      relativeHumidity: 2
    }]
  }, {
    id: 5678,
    description: 'the other description',
    location: {
      latitude: 56.34,
      longitude: 23.34
    },
    readings: [{
      temperature: 12,
      relativeHumidity: 23
    }]
  }, {
    id: 3,
    description: 'the final description',
    location: {
      latitude: 12.43,
      longitude: 12.21
    },
    readings: [{
      temperature: 71,
      relativeHumidity: 62
    }]
  }]

  beforeEach(() => {
    model = new EventEmitter();
    sensorModel = new SensorModel(model);
    sensorModel.on('sensorListUpdated', sensorListDouble);
  });

  const whenASensorIsCreated = (sensor) => {
    model.emit('newSensorCreated', Object.freeze(sensor));
  };

  const theSensorShouldMatch = (start, end, sensor, indexOfExpected) => {
    expect(sensorsDouble[indexOfExpected].id).toEqual(sensor.id);
    expect(sensorsDouble[indexOfExpected].description).toEqual(sensor.description);
    expect(sensorsDouble[indexOfExpected].location).toEqual(sensor.location);
    expect(sensorsDouble[indexOfExpected].readings[0].temperature).toEqual(sensor.readings[0].temperature);
    expect(sensorsDouble[indexOfExpected].readings[0].relativeHumidity).toEqual(sensor.readings[0].relativeHumidity);
    expect(sensorsDouble[indexOfExpected].readings[0].timestamp.getTime()).not.toBeLessThan(start.getTime());
    expect(sensorsDouble[indexOfExpected].readings[0].timestamp.getTime()).not.toBeGreaterThan(end.getTime());
  }

  const theSensorShouldBeInTheList = (start, end, sensor) => {
    theSensorShouldMatch(start, end, sensor, 0);
  }

  const givenThatSomeSensorsHaveBeenAdded = () => {
    someSensors.forEach((sensor) => {
      whenASensorIsCreated(sensor);
    });
  };

  const shouldBeAbleToReturnTheListOfSensorsThatWereAdded = (start, end) => {
    let actualSensorList = sensorModel.getSensorList();

    actualSensorList.forEach((sensor, index) => {
      theSensorShouldMatch(start, end, sensor, index);
    });
  };

  it('should update the list of sensors when a new sensor is created', () => {
    let sensor = {
      id: 1234,
      description: 'the description',
      location: {
        latitude: 12.34,
        longitude: 12.34
      },
      readings: [{
        temperature: 1,
        relativeHumidity: 2,
      }]
    };

    let start = new Date();
    whenASensorIsCreated(sensor);
    let end = new Date();

    theSensorShouldBeInTheList(start, end, sensor);
  });

  it('should return a list of sensors', () => {
    let start = new Date();
    givenThatSomeSensorsHaveBeenAdded();
    let end = new Date();

    shouldBeAbleToReturnTheListOfSensorsThatWereAdded(start, end);
  });
});

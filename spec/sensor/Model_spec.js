'use strict';

describe('app.frontend.src.sensor.Model', () => {
  const mach = require('mach.js');
  const EventEmitter = require('events').EventEmitter;
  const SensorModel = require('../../src/sensor/Model');

  let io;
  let socket;
  let anotherSocket;
  let sensorsDouble;
  let sensorListDoubleUpdate = (sensors) => {
    sensorsDouble = sensors
  };

  const someSensors = [{
    id: 1234,
    description: 'the description',
    latitude: 12.34,
    longitude: 12.34,
    temperature: 1,
    relativeHumidity: 2
  }, {
    id: 5678,
    description: 'the other description',
    latitude: 56.34,
    longitude: 23.34,
    temperature: 12,
    relativeHumidity: 23
  }, {
    id: 3,
    description: 'the final description',
    latitude: 12.43,
    longitude: 12.21,
    temperature: 71,
    relativeHumidity: 62
  }];

  beforeEach(() => {
    io = new EventEmitter();
    socket = new EventEmitter();
    anotherSocket = new EventEmitter();
    SensorModel(io);
    io.on('sensorListUpdated', sensorListDoubleUpdate);
  });

  const whenASensorIsCreated = (sensor) => {
    socket.emit('newSensorCreated', Object.freeze(sensor));
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

  const shouldBeAbleToReturnTheListOfSensorsThatWereAdded = (start, end, done) => {
    socket.on('returningSensorList', (actualSensorList) => {
      actualSensorList.forEach((sensor, index) => {
        theSensorShouldMatch(start, end, sensor, index);
      });
      done();
    });

    socket.emit('requestSensorList');
  };

  const givenThatAClientHasConnected = () => {
    io.emit('connect', socket);
  }

  it('should update the list of sensors when a new sensor is created', () => {
    const newSensor = {
      id: 1234,
      description: 'the description',
      latitude: 12.34,
      longitude: 12.34,
      temperature: 1,
      relativeHumidity: 2
    };

    givenThatAClientHasConnected();

    const start = new Date();
    whenASensorIsCreated(newSensor);
    const end = new Date();

    const expectedSensor = {
      id: newSensor.id,
      description: newSensor.description,
      location: {
        latitude: newSensor.latitude,
        longitude: newSensor.longitude
      },
      readings: [{
        temperature: newSensor.temperature,
        relativeHumidity: newSensor.relativeHumidity,
      }]
    };
    theSensorShouldBeInTheList(start, end, expectedSensor);
  });

  it('should return a list of sensors', (done) => {
    givenThatAClientHasConnected();
    const start = new Date();
    givenThatSomeSensorsHaveBeenAdded();
    const end = new Date();

    shouldBeAbleToReturnTheListOfSensorsThatWereAdded(start, end, done);
  });

  xit('should not lose the list of sensors when another socket connects', () => {
    // I don't know if this is a reasonable test because it is testing socket.io and I don't think that I want ot do that.
  });
});

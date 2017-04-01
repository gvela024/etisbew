'use strict';

describe('src.sensor.Model', () => {
  const mach = require('mach.js');
  const EventEmitter = require('events').EventEmitter;
  const SensorModel = require('../../src/sensor/Model');

  let io;
  let socket;
  let anotherSocket;
  let sensorsDouble;
  let mongooseStorage = [];
  let sensorListDoubleUpdate = (sensors) => {
    sensorsDouble = sensors
  };

  const expectedSchema = 'some schema double';

  function MongooseModel(sensor) {
    this.sensor = sensor;
    return {
      save: (response) => {
        mongooseStorage.push(this.sensor);
        response();
      }
    }
  }
  MongooseModel.find = (response) => {
    response(null, mongooseStorage);
  };
  const mongoose = {
    Schema: mach.mockFunction('mongoose.Schema'),
    model: (name, schema) => {
      expect(name).toEqual('Sensor');
      expect(schema).toEqual(expectedSchema);
      return MongooseModel
    }
  };

  const someSensors = [{
    id: '1234',
    description: 'the description',
    latitude: 12.34,
    longitude: 12.34,
    temperature: 1,
    relativeHumidity: 2
  }, {
    id: '5678',
    description: 'the other description',
    latitude: 56.34,
    longitude: 23.34,
    temperature: 12,
    relativeHumidity: 23
  }, {
    id: '3',
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
    io.on('sensorListUpdated', sensorListDoubleUpdate);
    mongooseStorage = [];
  });

  const whenASensorIsCreated = (sensor) => {
    socket.emit('newSensorCreated', Object.freeze(sensor));
  };

  const theSensorShouldMatch = (start, end, sensor, indexOfExpected) => {
    expect(sensor.id).toEqual(sensorsDouble[indexOfExpected].id);
    expect(sensor.description).toEqual(sensorsDouble[indexOfExpected].description);
    expect(sensor.location).toEqual(sensorsDouble[indexOfExpected].location);
    expect(sensor.readings[0].temperature).toEqual(sensorsDouble[indexOfExpected].readings[0].temperature);
    expect(sensor.readings[0].relativeHumidity).toEqual(sensorsDouble[indexOfExpected].readings[0].relativeHumidity);
    expect(sensor.readings[0].timestamp.getTime()).not.toBeLessThan(start.getTime());
    expect(sensor.readings[0].timestamp.getTime()).not.toBeGreaterThan(end.getTime());
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

  const givenThatSensorModelHasBeenInitialized = () => {
    mongoose.Schema.shouldBeCalledWithAnyArguments()
      .andWillReturn(expectedSchema)
      .when(() => {
        SensorModel(io, mongoose)
      });
  }

  it('should set up the database model when initialized', () => {
    mongoose.Schema.shouldBeCalledWith(mach.same({
        id: String,
        description: String,
        location: {
          latitude: Number,
          longitude: Number
        },
        readings: [{
          temperature: Number,
          relativeHumidity: Number,
          timestamp: Date
        }]
      }))
      .andWillReturn(expectedSchema)
      .when(() => {
        SensorModel(io, mongoose)
      });
  });

  it('should update the list of sensors when a new sensor is created', () => {
    const newSensor = {
      id: '1234',
      description: 'the description',
      latitude: 12.34,
      longitude: 12.34,
      temperature: 1,
      relativeHumidity: 2
    };

    givenThatSensorModelHasBeenInitialized();
    givenThatAClientHasConnected();

    const start = new Date();
    whenASensorIsCreated(newSensor);
    const end = new Date();

    theSensorShouldBeInTheList(start, end, mongooseStorage[0]);
  });

  it('should return a list of sensors', (done) => {
    givenThatSensorModelHasBeenInitialized();
    givenThatAClientHasConnected();
    const start = new Date();
    givenThatSomeSensorsHaveBeenAdded();
    const end = new Date();

    shouldBeAbleToReturnTheListOfSensorsThatWereAdded(start, end, done);
  });
});

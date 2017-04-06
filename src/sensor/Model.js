'use strict';

module.exports = (io, mongoose) => {
  const sensorSchema = mongoose.Schema({
    identification: String,
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
  });
  const SensorModel = mongoose.model('Sensor', sensorSchema);

  io.on('connect', (socket) => {
    socket.on('newSensorCreated', (newSensor) => {
      updateList(newSensor);
    });

    socket.on('requestSensorList', () => {
      sendUpdatedSensorListToClients(socket);
    });

    socket.on('deleteSensorById', (idOfSensorToDelete) => {
      removeSenorFromModel(idOfSensorToDelete);
      sendUpdatedSensorListToClients(socket);
    });
  });

  const updateList = (newSensor) => {
    const timestamp = new Date();
    const sensor = new SensorModel({
      identification: newSensor.identification,
      description: newSensor.description,
      location: {
        latitude: newSensor.latitude,
        longitude: newSensor.longitude
      },
      readings: [{
        temperature: newSensor.temperature,
        relativeHumidity: newSensor.relativeHumidity,
        timestamp: timestamp
      }]
    });
    sensor.save((error, _) => {
      publishUpdate();
    });
  }

  const publishUpdate = () => {
    SensorModel.find((error, sensors) => {
      io.emit('sensorListUpdated', sensors);
    });
  }

  const removeSenorFromModel = (identification) => {
    SensorModel.findOneAndRemove({
      'identification': identification
    }, (error, sensor) => {
      // do nothing
    });
  }

  const sendUpdatedSensorListToClients = (socket) => {
    SensorModel.find((error, sensors) => {
      socket.emit('returningSensorList', sensors)
    });
  }
}

'use strict';

module.exports = (io) => {
  let sensors = [];

  io.on('connect', (socket) => {
    socket.on('newSensorCreated', (sensor) => {
      updateList(sensor, socket);
    });

    socket.on('requestSensorList', () => {
      socket.emit('returningSensorList', sensors)
    });
  })

  const updateList = (sensor, socket) => {
    const timestamp = new Date();
    sensors.push({
      id: sensor.id,
      description: sensor.description,
      location: {
        latitude: sensor.latitude,
        longitude: sensor.longitude
      },
      readings: [{
        temperature: sensor.temperature,
        relativeHumidity: sensor.relativeHumidity,
        timestamp: timestamp
      }]
    });

    publishUpdate(socket);
  }

  const publishUpdate = (socket) => {
    socket.emit('sensorListUpdated', sensors);
  }
}

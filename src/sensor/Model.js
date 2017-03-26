'use strict';

module.exports = (socket) => {
  let sensors = [];

  socket.on('newSensorCreated', (sensor) => {
    updateList(sensor);
  });

  socket.on('requestSensorList', () => {
    socket.emit('returningSensorList', sensors)
  })

  function updateList(sensor) {
    const timestamp = new Date();
    sensors.push({
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

    publishUpdate();
  }

  function publishUpdate() {
    socket.emit('sensorListUpdated', sensors);
  }
}

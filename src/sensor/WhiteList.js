'use strict';

module.exports = (io, model) => {
  io.on('connect', (socket) => {
    socket.on('newSensorCreated', (newSensor) => {
      sendRequestToAddToWhiteList(newSensor, socket);
    });

    socket.on('sensorAccepted', (sensor) => {
      console.log('sensor accepted');
      console.log(sensor);
    })

    // socket.on('updateSensor', (sensor) => {
    //   update(sensor);
    //   publishUpdate(socket);
    // });
    //
    // socket.on('newReadingFromSensor', (identification, reading) => {
    //   updateSensorWithReading(identification, reading);
    //   publishUpdate(socket);
    // });
  });

  const sendRequestToAddToWhiteList = (newSensor, socket) => {
    socket.emit('requestSensorValidation', newSensor);
  }
}

var sensor = include('server/models/sensor');

module.exports = function(app) {
  app.get('/api/v0/sensors', function(req, res) {
    sensor.find(function(err, sensors) {
      if (err) res.send(err);
      res.json(sensors);
    });
  });

  app.get('*', function(req, res) {
    res.sendFile(absolute_path('/client/index.html'));
  });
};

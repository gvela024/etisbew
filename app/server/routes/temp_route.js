var sensor = include('app/server/models/sensor');

module.exports = function(app) {
  app.get('/api/v0/sensors', function(req, res) {
    sensor.find(function(err, sensors) {
      if (err) res.send(err);
      res.json(sensors);
    });
  });

  app.get('*', function(req, res) {
    res.sendFile(absolute_path('/app/client/index.html'), function(error) {
      if(error) {
        console.log(error);
        next(error);
      }
    });
  });
};

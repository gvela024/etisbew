describe('client.src.sensor.controller', function() {
  var SensorController;
  var scope;

  beforeEach(module('sensor_controller'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    SensorController = $controller('sensor.controller', { '$scope': scope });
  }));

  it('should set the tagline to expected string', function() {
    expect(scope.tagline).toBe('Nothing beats a pocket protector!');
  });
});

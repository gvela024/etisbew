describe('client.src.sensor.controller', function() {
  var rootScope;
  var controller;
  var location;
  var route;

  beforeEach(module('sensor'));
  beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _$controller_) {
    location = _$location_;
    rootScope = _$rootScope_;
    controller = _$controller_;
    route = _$route_;
  }));

  it('should set the tagline to expected string', function() {
    controller('sensor.controller', {
      '$scope': rootScope
    });
    expect(rootScope.tagline).toBe('Nothing beats a pocket protector!');
  });

  it('should use the sensor controller on load of /sensors', function() {
    location.path('/sensors');
    rootScope.$digest();
    expect(route.current.controller).toBe('sensor.controller');
  });

  it('should set the correct template URL on load of /sensors', function() {
    location.path('/sensors');
    rootScope.$digest();
    expect(route.current.loadedTemplateUrl).toBe('/src/sensor/home.html');
  });
});

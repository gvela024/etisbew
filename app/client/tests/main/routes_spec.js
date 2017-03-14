describe('client.src.main.routes', function() {
  var route;
  var location;
  var rootScope;

  beforeEach(module('main_routes'));
  beforeEach(inject(function(_$location_, _$route_, _$rootScope_) {
    location = _$location_;
    route = _$route_;
    rootScope = _$rootScope_;
  }));

  it('should use the main controller on successful load of /', function() {
    location.path('/');
    rootScope.$digest();
    expect(route.current.controller).toBe('main.controller');
  });

  it('should have main/home.html as the URL on successful load of /', function() {
    location.path('/');
    rootScope.$digest();
    expect(route.current.loadedTemplateUrl).toBe('main/home.html');
  });

  it('should use the sensor controller on successful load of /sensors', function() {
    location.path('/sensors');
    rootScope.$digest();
    expect(route.current.controller).toBe('sensor.controller');
  });

  it('should have sensor/home.html as the URL on successful load of /sensors', function() {
    location.path('/sensors');
    rootScope.$digest();
    expect(route.current.loadedTemplateUrl).toBe('sensor/home.html');
  });
});

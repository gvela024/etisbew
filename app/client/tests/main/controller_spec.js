describe('client.src.main.controller', function() {
  var rootScope;
  var controller;
  var location;
  var route;

  beforeEach(module('main'));
  beforeEach(inject(function(_$location_, _$route_, _$rootScope_, _$controller_) {
    location = _$location_;
    rootScope = _$rootScope_;
    controller = _$controller_;
    route = _$route_;
  }));

  it('should set the tagline to expected string', function() {
    controller('main.controller', {
      '$scope': rootScope
    });
    expect(rootScope.tagline).toBe('To the moon and back!');
  });

  it('should use the main controller on load of /main', function() {
    location.path('/main');
    rootScope.$digest();
    expect(route.current.controller).toBe('main.controller');
  });

  it('should set the correct template URL on load of /main', function() {
    location.path('/main');
    rootScope.$digest();
    expect(route.current.loadedTemplateUrl).toBe('/src/main/home.html');
  });
});

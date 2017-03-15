describe('client.app', function() {
  var location;
  var route;
  var rootScope;

  beforeEach(module('etisbew'));
  beforeEach(inject(function(_$location_, _$route_, _$rootScope_) {
      location = _$location_;
      route = _$route_;
      rootScope = _$rootScope_;
  }));

  it('should redirect to main when an unexpected URL is provided', function() {
    location.path('/unknown-URL');
    rootScope.$digest();
    expect(route.current.loadedTemplateUrl).toBe('/src/main/home.html');
  });

  it('should be using HTML5', function() {
    expect(location.$$html5).toBeTruthy();
  });
});

describe('client.src.main.controller', function() {
  var MainController;
  var scope;

  beforeEach(module('main_controller'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    MainController = $controller('controller', { '$scope': scope });
  }));

  it('should set the tagline to expected string', function() {
    expect(scope.tagline).toBe('To the moon and back!');
  });
});

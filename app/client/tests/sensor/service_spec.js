describe('client.src.sensor_service', function() {
  var SensorFactory;
  var $httpBackend;
  var authenticateRequestHandler;

  beforeEach(module('sensor_service'));
  beforeEach(inject(function(_$httpBackend_, _sensor_factory_) {
    $httpBackend = _$httpBackend_;
    SensorFactory = _sensor_factory_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should ....', function() {
    var expected = { data: 'result' };
    var actual = {};

    $httpBackend.expect('GET', '/api/v0/sensors').respond(200, expected);
    SensorFactory.get().then(function(responseData) {
      actual = responseData.data;
    });
    $httpBackend.flush();

    expect(actual).toEqual(expected);
  });
});

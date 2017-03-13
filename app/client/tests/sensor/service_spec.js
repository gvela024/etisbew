describe('client.src.sensor.service', function() {
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

  it('should call GET with the correct URL for getting all the sensors', function() {
    var expected = { data: 'result' };
    var actual = {};

    $httpBackend.expect('GET', '/api/v0/sensors').respond(200, expected);
    SensorFactory.get().then(function(responseData) {
      actual = responseData.data;
    });
    $httpBackend.flush();

    expect(actual).toEqual(expected);
  });

  it('should call POST with the correct URL for creating a new sensor and some data', function() {
    var fakeSensor = { sensor: 'one' };

    $httpBackend.expect('POST', '/api/v0/sensors', fakeSensor).respond(201);
    SensorFactory.create(fakeSensor);
    $httpBackend.flush();
  });

  it('should call DELETE with the correct URL for deleting a sensor and some ID', function() {
    var fakeSensorId = 1234;

    $httpBackend.expect('DELETE', '/api/v0/sensors/' + fakeSensorId).respond(200);
    SensorFactory.delete(fakeSensorId);
    $httpBackend.flush();
  })
});

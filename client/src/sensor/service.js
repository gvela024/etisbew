angular.module('sensor_service', []).factory('sensor', ['$http', function($http) {
  return {
    get: function() {
      return $http.get('/api/v0/sensors');
    },

    create: function(sensorData) {
      return $http.post('/api/v0/sensors', sensorData);
    },

    delete: function(id) {
      return $http.delete('/api/v0/sensors/' + id);
    }
  }
}]);

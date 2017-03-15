'use strict';

angular.module('sensor', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/sensors', {
      templateUrl: '/src/sensor/home.html',
      controller: 'sensor.controller'
    });
  }])
  .controller('sensor.controller', [
    '$scope',
    function($scope) {
      console.log('sensor controller');
      $scope.tagline = 'Nothing beats a pocket protector!';
    }
  ]);

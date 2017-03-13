'use strict';

angular.module('main_routes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProveder
      .when('/', {
        templateUrl: absolute_path('/client/src/main/home.html'),
        controller: 'main_controller'
      })
      .when('/sensors', {
        templateUrl: absolute_path('/client/src/sensor/home.html'),
        controller: 'sensor_controller'
      });

    $locationProvider.html5Mode(true);
  }]);

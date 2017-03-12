'use strict';

angular.module('main.routes', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProveder
      .when('/', {
        templateUrl: absolute_path('/client/src/main/home.html'),
        controller: 'main.controller'
      })
      .when('/sensors', {
        templateUrl: absolute_path('/client/src/sensor/home.html'),
        controller: 'sensor.controller'
      });

    $locationProvider.html5Mode(true);
  }]);

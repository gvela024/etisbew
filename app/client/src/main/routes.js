'use strict';

angular.module('main_routes', ['ngRoute'])
  .config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'main/home.html',
          controller: 'main_controller'
        })
        .when('/sensors', {
          templateUrl: 'sensor/home.html',
          controller: 'sensor_controller'
        });

      $locationProvider.html5Mode(true);
    }
  ]);

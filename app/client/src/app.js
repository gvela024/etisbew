'use strict';

angular
  .module(
    'etisbew', [
      'ngRoute',
      'main',
      'sensor'
    ])
  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      console.log('app - in config');
      $locationProvider.html5Mode(true);
      $routeProvider.otherwise({
        redirectTo: 'main'
      });
    }
  ]);

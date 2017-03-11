angular.module('MainRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProveder
    .when('/', {
      templateUrl: absolute_path('/client/src/main/home.html'),
      controller: 'MainController'
    })
    .when('/sensors', {
      templateUrl: absolute_path('/client/src/sensor/home.html')
      controller: 'SensorController'
    });

  $locationProvider.html5Mode(true);
}])

'use strict';

angular.module('main', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/main', {
      templateUrl: '/src/main/home.html',
      controller: 'main.controller'
    });
  }])
  .controller('main.controller', [
    '$scope',
    function($scope) {
      console.log('main controller');
      $scope.tagline = 'To the moon and back!';
    }
  ]);

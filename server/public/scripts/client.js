var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngMaterial', 'ngMessages', 'mdPickers', 'angularMoment']);

// Routes
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController',
    })
    .when('/registration', {
      templateUrl: '/views/templates/registration.html',
      controller: 'LoginController',
    })
    .when('/user', {
      templateUrl: '/views/templates/destination.html',
      controller: 'DestinationController',
      controllerAs: 'destination',
      resolve: {
        getuser : function(UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);

var myApp = angular.module('myApp', ['ngRoute']);

// Routes
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: 'LoginController',
    })
    .when('/registration', {
      templateUrl: '/views/registration.html',
      controller: 'LoginController',
    })
    .when('/destination', {
      templateUrl: '/views/destination.html',
      controller: 'TripController',
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

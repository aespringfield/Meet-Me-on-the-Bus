var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'mdPickers', 'angularMoment']);

// Routes
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController',
    })
    .when('/user', {
      templateUrl: '/views/templates/destInput.html',
      controller: 'DestInputController',
      controllerAs: 'destInput',
      resolve: {
        getuser : function(UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/originInput', {
      templateUrl: '/views/templates/originInput.html',
      controller: 'OriginInputController',
      controllerAs: 'originInput',
      resolve: {
        getuser : function(UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/indivDetails', {
      templateUrl: '/views/templates/indivDetails.html',
      controller: 'OriginInputController',
      controllerAs: 'originInput',
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

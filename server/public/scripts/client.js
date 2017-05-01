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
    .when('/destInput', {
      templateUrl: '/views/templates/destInput.html',
      controller: 'DestInputController',
      controllerAs: 'destInput',
      resolve: {
        getUser : function(PersonService) {
          return PersonService.getUser();
        }
      }
    })
    .when('/originInput', {
      templateUrl: '/views/templates/originInput.html',
      controller: 'OriginInputController',
      controllerAs: 'originInput',
      resolve: {
        getUser : function(PersonService) {
          return PersonService.getUser();
        }
      }
    })
    .when('/indivDetails', {
      templateUrl: '/views/templates/indivDetails.html',
      controller: 'IndivDetailsController',
      controllerAs: 'indivDetails',
      resolve: {
        getUser : function(PersonService) {
          return PersonService.getUser();
        }
      }
    })
    .when('/addFriends', {
      templateUrl: '/views/templates/addFriends.html',
      controller: 'FriendsController',
      controllerAs: 'friends',
      resolve: {
        getUser : function(PersonService) {
          return PersonService.getUser();
        }
      }
    })
    .when('/newFriend', {
      templateUrl: '/views/templates/newFriend.html',
      controller: 'FriendsController',
      controllerAs: 'friends',
      resolve: {
        getUser : function(PersonService) {
          return PersonService.getUser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);

let myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'mdPickers', 'angularMoment']);

// Routes
myApp.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
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
        getUser : ['PersonService', function(PersonService){
          return PersonService.getUser();
        }]
      }
    })
    .when('/originInput', {
      templateUrl: '/views/templates/originInput.html',
      controller: 'OriginInputController',
      controllerAs: 'originInput',
      resolve: {
        getUser : ['PersonService', function(PersonService){
          return PersonService.getUser();
        }]
      }
    })
    .when('/indivDetails', {
      templateUrl: '/views/templates/indivDetails.html',
      controller: 'IndivDetailsController',
      controllerAs: 'indivDetails',
      resolve: {
        getUser : ['PersonService', function(PersonService){
          return PersonService.getUser();
        }]
      }
    })
    .when('/addFriends', {
      templateUrl: '/views/templates/addFriends.html',
      controller: 'FriendsController',
      controllerAs: 'friends',
      resolve: {
        getUser : ['PersonService', function(PersonService){
          return PersonService.getUser();
        }]
      }
    })
    .when('/newFriend', {
      templateUrl: '/views/templates/newFriend.html',
      controller: 'FriendsController',
      controllerAs: 'friends',
      resolve: {
        getUser : ['PersonService', function(PersonService){
          return PersonService.getUser();
        }]
      }
    })
    .when('/groupPlan', {
      templateUrl: '/views/templates/groupPlan.html',
      controller: 'GroupPlanController',
      controllerAs: 'groupPlan',
      resolve: {
        getUser : ['PersonService', function(PersonService){
          return PersonService.getUser();
        }]
      }
    })
    .when('/groupMap', {
      templateUrl: '/views/templates/groupMap.html',
      controller: 'GroupMapController',
      controllerAs: 'groupMap',
      resolve: {
        getUser : ['PersonService', function(PersonService){
          return PersonService.getUser();
        }]
      }
    })
    .when('/indivMap', {
      templateUrl: '/views/templates/indivMap.html',
      controller: 'IndivMapController',
      controllerAs: 'indivMap',
      resolve: {
        getUser : ['PersonService', function(PersonService){
          return PersonService.getUser();
        }]
      }
    })
    // Accept a route with an activation code as a parameter
    .when('/activate/:code', {
      templateUrl: '/views/templates/activate.html',
      controller: 'ActivateController',
      resolve: {
        getUser : ['PersonService', function(PersonService){
          return PersonService.getUser();
        }]
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
    $mdThemingProvider
      .theme('default')
      .primaryPalette('amber')
      .accentPalette('orange');
}]);

myApp.factory('UserService', ['$http', '$location', '$route', 'PersonService', function($http, $location, $route, PersonService){
  console.log('User Service Loaded');

  // this will ultimately be deleted
  let userObject = {};



  return {
    userObject : userObject,

    logout : function() {
        $http.get('/user/logout').then(function(response) {
          console.log('logged out');
          $location.path("/home");
        });
    }
  };
}]);

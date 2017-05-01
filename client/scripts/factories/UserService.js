myApp.factory('UserService', ['$http', '$location', 'PersonService', function($http, $location, PersonService){
  console.log('User Service Loaded');

  // this will ultimately be deleted
  let userObject = {};

  // this is the master object from which other stuff is being called
  let userControl = {};

  // let getUser = function(){
  //   $http.get('/user').then(function(response) {
  //       if(response.data.username) {
  //           // user has a current session on the server
  //           userObject.userName = response.data.username;
  //           userControl.mainUser = new MainUser(response.data.firstName, response.data.lastName, response.data.username);
  //           console.log('Email: ', userControl.mainUser.getEmail(), '\n',
  //           'Name: ', userControl.mainUser.getFullName());
  //           console.log(userControl.mainUser);
  //       } else {
  //           // user has no session, bounce them back to the login page
  //           $location.path("/home");
  //       }
  //    });
  // };

  return {
    userObject : userObject,
    userControl : userControl,
    // getUser : getUser,

    logout : function() {
        $http.get('/user/logout').then(function(response) {
          console.log('logged out');
          $location.path("/home");
        });
    }
  };
}]);

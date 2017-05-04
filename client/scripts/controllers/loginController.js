myApp.controller('LoginController', ['$scope', '$http', '$location', 'UserService', 'PersonService', function($scope, $http, $location, UserService, PersonService) {
    $scope.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    };
    $scope.message = '';

    $scope.login = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to destination input page');
            PersonService.getUser(PersonService.instantiateMainUser);
            if(PersonService.code.tempCode !== undefined) {
              // Do we have an activation code?
              $location.path('/activate/' + PersonService.code.tempCode);
            } else {
              // location works with SPA (ng-route)
              $location.path('/destInput');
            }
          } else {
            console.log('failure: ', response);
            $scope.message = "Wrong!!";
          }
        });
      }
    };

    $scope.registerUser = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          if(PersonService.code.tempCode != undefined) {
            // Do we have an activation code?
            $location.path('/activate/' + PersonService.code.tempCode);
          } else {
            // location works with SPA (ng-route)
            $location.path('/destInput');
          }
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again.";
        });
      }
    };

    $scope.goTo = function(file) {
      $location.path(file);
    };


}]);

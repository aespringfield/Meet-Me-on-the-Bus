myApp.controller('ActivateController', ['$scope', '$http', '$location', '$routeParams', 'PersonService', function($scope, $http, $location, $routeParams, PersonService) {
  $scope.logout = PersonService.logout;
  $scope.code = angular.copy(PersonService.code);
  $scope.joinGroup = PersonService.joinGroup;

  // Access route parameters
  if($routeParams.code !== undefined) {
    // If user was already logged in, code will be here
    $scope.code.tempCode = $routeParams.code;
  } else {
    // Code was saved in the UserService before
    // bouncing user to log in screen
  }

  console.log('ActivateController loaded', $scope.code.tempCode);
}]);

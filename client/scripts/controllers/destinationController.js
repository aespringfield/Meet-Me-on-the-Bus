myApp.controller('DestinationController', ['UserService', 'moment', function (UserService, moment) {
  let destination = this;
  destination.logout = UserService.logout;
}]);

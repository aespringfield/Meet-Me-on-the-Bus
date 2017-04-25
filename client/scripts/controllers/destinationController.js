myApp.controller('DestinationController', ['UserService', 'moment', function (UserService, moment) {
  let destination = this;
  destination.now = '';
  destination.setDate = function() {
    destination.now = new Date();
    let momo = moment().add(1, 'week').format('LL');
    console.log(momo);
  };
  destination.logout = UserService.logout;
}]);

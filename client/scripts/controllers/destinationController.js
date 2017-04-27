myApp.controller('DestinationController', ['$http', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {
  let destination = this;

  destination.date = new Date();

  destination.mainUser = PersonService.mainUser;
  destination.set = PersonService.mainUser.currentTrip.setDestination;





destination.logout = UserService.logout;

  // destination.currentDate = new Date();
// destination.showTimePicker = function(ev) {
//   $mdpTimePicker(destination.currentTime, {
//     targetEvent: ev
//   }).then(function(selectedDate) {
//     destination.currentTime = selectedDate;
//   });



}]);

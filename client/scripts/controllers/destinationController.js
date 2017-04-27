myApp.controller('DestinationController', ['$scope', 'UserService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($scope, UserService, moment, $mdpDatePicker, mdpTimePicker) {
  let destination = this;
  destination.date = moment();
  destination.moment = moment;
  console.log(destination.date);

  function convertToTime(date) {
    return moment(date).format('LT');
  }
  destination.dateInput = new Date()
  destination.time = convertToTime(destination.date);
  let tim = moment(destination.time, 'LT');
  console.log(tim);
  destination.logout = UserService.logout;
  destination.log = function(thing) {
    console.log("hey");
    console.log(thing);
    console.log(moment(thing));
    console.log(moment(thing).valueOf());
  }


  // destination.currentDate = new Date();
// destination.showTimePicker = function(ev) {
//   $mdpTimePicker(destination.currentTime, {
//     targetEvent: ev
//   }).then(function(selectedDate) {
//     destination.currentTime = selectedDate;
//   });



}]);

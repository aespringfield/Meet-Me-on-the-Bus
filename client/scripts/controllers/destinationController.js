myApp.controller('DestinationController', ['$http', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {
  let destination = this;

  destination.date = new Date();

  destination.mainUser = PersonService.mainUser;
  // destination.set = PersonService.mainUser.currentTrip.setDestination;

  destination.set = function(address) {
    let addressObject = {address: address};
    console.log(addressObject);
    $http.post('/geocode/search', addressObject).then(function(response) {
      console.log(response);
      let result = response.data.results[0];
      PersonService.mainUser.currentTrip.setDestination(result);
      console.log(PersonService.mainUser.currentTrip.destination);
    });
  };




destination.logout = UserService.logout;



}]);

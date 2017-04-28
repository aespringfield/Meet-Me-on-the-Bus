myApp.controller('DestInputController', ['$http', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {
  let destInput = this;

  destInput.trip = PersonService.mainUser.currentTrip;

  destInput.searchForm = destInput.trip.createSearchForm(destInput.trip);

  // would like to add the 3 functions below to SearchForm class
  destInput.setTripInfo = function(address, date) {
    setDestination(address);
    setDesiredEta(date);
    console.log(destInput.trip);
  };

  let setDestination = function(address) {
    let addressObject = {address: address};
    $http.post('/geocode/search', addressObject).then(function(response) {
      let result = response.data.results[0];
      destInput.trip.setDestination(result);
    });
  };

  let setDesiredEta = function(date) {
    destInput.trip.setDesiredEta(date);
  };






destInput.logout = UserService.logout;



}]);

myApp.controller('OriginInputController', ['$http', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {
  let originInput = this;

  originInput.trip = PersonService.mainUser.currentTrip;

  originInput.searchForm = originInput.trip.createSearchForm(originInput.trip);

  // would like to add the 3 functions below to SearchForm class
  originInput.setTripInfo = function(address, date) {
    setDestination(address);
    setDesiredEta(date);
    console.log(originInput.trip);
  };

  let setDestination = function(address) {
    let addressObject = {address: address};
    $http.post('/geocode/search', addressObject).then(function(response) {
      let result = response.data.results[0];
      originInput.trip.setDestination(result);
    });
  };

  let setDesiredEta = function(date) {
    originInput.trip.setDesiredEta(date);
  };






originInput.logout = UserService.logout;



}]);

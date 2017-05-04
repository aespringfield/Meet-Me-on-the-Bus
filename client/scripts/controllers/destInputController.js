myApp.controller('DestInputController', ['$http', '$location', '$mdpTimePicker', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, $location, $mdpTimePicker, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {
  let destInput = this;

  destInput.trip = PersonService.userControl.mainUser.currentTrip;

  console.log('in dest. trip is', destInput.trip);

  destInput.searchForm = destInput.trip.createDestSearchForm(destInput.trip);

  // would like to add the 3 functions below to SearchForm class
  destInput.setTripInfo = function() {
    let address = destInput.searchForm.address;
    let date = destInput.searchForm.date;
    let validInput = destInput.searchForm.checkInput(address, date);
    if (validInput) {
      setDestination(address);
      setDesiredEta(date);
    }
  };

  let setDestination = function(address) {
    let addressObject = {address: address};
    $http.post('/geocode/search', addressObject).then(function(response) {
      let result = response.data.results[0];
      destInput.trip.setDestination(result);
      console.log(destInput.trip);
      $location.path('/originInput');
    }, function(error) {
      console.log(error);
    });
  };

  let setDesiredEta = function(date) {
    destInput.trip.setDesiredEta(date);
  };

  let convertToMoment = function(date) {
    let newMoment = moment(date).format('llll');
    return newMoment;
  }

  destInput.logout = UserService.logout;

}]);

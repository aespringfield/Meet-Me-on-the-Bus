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
      setDestination();
      setDesiredEta(date);
    }
    goTo('/originInput')
  };

  let goTo = function(file) {
    $location.path(file);
  }

  // TODO: add checker to make sure valid input
  destInput.checkDestination = function() {
    let address = destInput.searchForm.address;
    let addressObject = {address: address};
    $http.post('/geocode/search', addressObject).then(function(response) {
      let result = response.data.results[0];
      console.log(result);
      destInput.searchForm.setTempDestination(result);
    }, function(error) {
      console.log(error);
    });
  };

  let setDestination = function() {
    let destination = destInput.searchForm.getTempDestination();
    destInput.trip.setDestination(destination);
    console.log(destInput.trip);
    return destInput.trip.getDestination();
  };


  let setDesiredEta = function(date) {
    destInput.trip.setDesiredEta(date);
  };

  destInput.logout = UserService.logout;

}]);

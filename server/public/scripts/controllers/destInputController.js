myApp.controller('DestInputController', ['$http', '$location', '$mdpTimePicker', 'UserService', 'PersonService', 'moment', function ($http, $location, $mdpTimePicker, UserService, PersonService, moment, $mdpTimePicker) {
  let destInput = this;

  let trip = PersonService.userControl.mainUser.currentTrip;

  console.log('in dest. trip is', trip);

  destInput.searchForm = trip.createDestSearchForm(trip);
  let setTripInfo = PersonService.setTripInfo;
  let goTo = PersonService.goTo;

  // would like to add the 3 functions below to SearchForm class
  destInput.setTripInfo = function() {
    let address = destInput.searchForm.address;
    let date = destInput.searchForm.date;
    let validInput = destInput.searchForm.checkInput(address, date);
    if (validInput) {
      destInput.searchForm.clearErrorMessage();
      setEnteredDestName(address);
      setDestination(address);
      setDesiredEta(date);
    }
  };

  destInput.setInfoAndAdvance = function() {
    setTripInfo(destInput.searchForm, '/originInput');
  };

  destInput.logout = UserService.logout;

}]);

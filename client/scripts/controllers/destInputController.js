myApp.controller('DestInputController', ['$http', '$location', '$mdpTimePicker', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, $location, $mdpTimePicker, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {
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
      setDestination(address);
      setDesiredEta(date);
    }
  };

  destInput.setInfoAndAdvance = function() {
    setTripInfo(destInput.searchForm);
    goTo('/originInput');
  };

  let setDestination = function(address) {
    let addressObject = {address: address};
    $http.post('/geocode/search', addressObject).then(function(response) {
      let result = response.data.results[0];
      trip.setDestination(result);
      console.log(trip);
      $location.path('/originInput');
    }, function(error) {
      console.log(error);
    });
  };



  let convertToMoment = function(date) {
    let newMoment = moment(date).format('llll');
    return newMoment;
  }


  destInput.logout = UserService.logout;

}]);

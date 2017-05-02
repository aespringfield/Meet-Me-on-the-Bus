myApp.controller('DestInputController', ['$http', '$location', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, $location, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {
  let destInput = this;

  destInput.trip = PersonService.userControl.mainUser.currentTrip;

  console.log('in dest. trip is', destInput.trip);

  destInput.searchForm = destInput.trip.createDestSearchForm(destInput.trip);

  // would like to add the 3 functions below to SearchForm class
  destInput.setTripInfo = function(address, date) {
    setDestination(address);
    setDesiredEta(date);
  };

  let setDestination = function(address) {
    let addressObject = {address: address};
    $http.post('/geocode/search', addressObject).then(function(response) {
      let result = response.data.results[0];
      destInput.trip.setDestination(result);
      console.log(destInput.trip);
      $location.path('/originInput');
    });
  };

  let setDesiredEta = function(date) {
    destInput.trip.setDesiredEta(date);
  };

  destInput.logout = UserService.logout;

  // destInput.sendMail = function() {
  //   let mailer = {
  //     toEmail: [PersonService.userControl.mainUser.email],
  //     subject: 'Hello there!',
  //     message: 'What\'s new, buddy?',
  //   };
  //   console.log("mailer is", mailer);
  //   $http.post('/mail', mailer).then(function(response) {
  //     console.log(response);
  //   });
  // };

}]);

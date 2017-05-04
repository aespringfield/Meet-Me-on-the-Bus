myApp.controller('OriginInputController', ['$http', '$location', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, $location, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {
  let originInput = this;

  let trip = PersonService.userControl.mainUser.currentTrip;
  let person = trip.groupManager.focusPerson;
  let requestRoute = PersonService.requestRoute;

  console.log("person is", person);

  function goToFriends() {
    $location.path('/addFriends');
  }

  originInput.searchForm = trip.createOriginSearchForm(person);

  // would like to add this function to a class (SearchForm? InvitedPerson? Origin?)
  originInput.setOrigin = function() {
    let address = originInput.searchForm.address;
    let date = originInput.searchForm.date;
    let addressObject = {address: address};
    $http.post('/geocode/search', addressObject).then(function(response) {
      let result = response.data.results[0];
      person.origin.setFrom(result);
      console.log(trip);
      let directionsParams = trip.createDirectionsParams(person, 'departure_time')
      requestRoute(directionsParams, trip, goToFriends);
    });

    person.origin.setEarliestDepartTime(date);
  };

  originInput.logout = UserService.logout;

}]);

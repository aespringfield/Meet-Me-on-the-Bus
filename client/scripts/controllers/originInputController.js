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
  originInput.setOrigin = function(address, date) {
    let addressObject = {address: address};
    $http.post('/geocode/search', addressObject).then(function(response) {
      let result = response.data.results[0];
      person.origin.setFrom(result);
      console.log(trip);
      let routeObject = {
        origin: person.origin.formatted_address,
        destination: trip.destination.formatted_address,
        date: person.origin.earliestDepartTime,
        searchBy: 'departure_time'
      };
      requestRoute(routeObject, trip, goToFriends);
    });

    person.origin.setEarliestDepartTime(date);
  };

  originInput.logout = UserService.logout;

}]);

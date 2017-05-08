myApp.controller('OriginInputController', ['$http', '$location', 'UserService', 'PersonService', 'moment', '$mdpTimePicker', function ($http, $location, UserService, PersonService, moment, $mdpTimePicker) {
  let originInput = this;

  let trip = PersonService.userControl.mainUser.currentTrip;
  let person = trip.groupManager.focusPerson;
  let requestRoute = PersonService.requestRoute;

  // this doesn't work for all addresses--pull from places?
  let address_components = trip.destination.address_components;
  let street_address = address_components[0].short_name + ' ' + address_components[1].short_name;
  let city = address_components[3].long_name;

  originInput.destination = street_address + ', ' + city;

  let setHeader = function() {
    let header;
    if (person.mainUser === true) {
      header = 'Your origin';
    } else if (person.mainUser === false) {
      header = person.firstName;
    }
    return header;
  };

  originInput.header = setHeader();

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
      let directionsParams = trip.createDirectionsParams(person, 'departure_time');
      requestRoute(directionsParams, trip, goToFriends);
    });

    person.origin.setEarliestDepartTime(date);
  };

  originInput.logout = UserService.logout;

}]);

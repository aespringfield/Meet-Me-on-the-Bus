myApp.controller('OriginInputController', ['$http', '$location', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, $location, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {
  let originInput = this;

  originInput.trip = PersonService.mainUser.currentTrip;
  originInput.person = PersonService.mainUser.currentTrip.groupManager.findPerson('firstName', 'Lucinda');
  // originInput.person = PersonService.mainUser.currentTrip.groupManager.findPerson('mainUser', true);

  originInput.searchForm = originInput.trip.createOriginSearchForm(originInput.person);

  // would like to add this function to a class (SearchForm? InvitedPerson? Origin?)
  originInput.setOrigin = function(address, date) {
    let addressObject = {address: address};
    $http.post('/geocode/search', addressObject).then(function(response) {
      let result = response.data.results[0];
      originInput.person.origin.setFrom(result);
      console.log(originInput.trip);
    });
    originInput.person.origin.setEarliestDepartTime(date);
  };

  originInput.logout = UserService.logout;

}]);

myApp.controller('OriginInputController', ['$http', '$location', '$sce','UserService', 'PersonService', 'moment', '$mdpTimePicker', function ($http, $location, $sce, UserService, PersonService, moment, $mdpTimePicker) {
  let originInput = this;

  let trip = PersonService.userControl.mainUser.currentTrip;
  let person = trip.groupManager.focusPerson;
  let requestRoute = PersonService.requestRoute;

  // this doesn't work for all addresses--pull from places?
  let address_components = trip.destination.address_components;
  let street_address = address_components[0].short_name + ' ' + address_components[1].short_name;
  let city = address_components[3].long_name;
  let apiKey = PersonService.keyObject.apiKey;

  originInput.destination = street_address + ', ' + city;

  console.log("person is", person);

  function goToFriends() {
    $location.path('/addFriends');
  }

  console.log("origin. key is", apiKey);

  originInput.gmUrl = $sce.trustAsResourceUrl("https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&v=3&callback=initMap");

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

  originInput.initMap = function() {
    originInput.map = new google.maps.Map(document.getElementById('origin-map'), {
      center: {lat: 44.9417, lng:-93.1914},
      zoom: 10
    });
  };

  // google.maps.event.addDomListener(window, 'load', originInput.initMap);

  originInput.logout = UserService.logout;


  // PRIVATE METHODS.
  // ---
  // I load the 3rd-party script tag.
  let loadSync = function() {
      // Inject script before first script in page.
      // --
      // NOTE: Code like this is often copy-pasted out of some read-me
      // on the 3rd-party vendor documentation.
      var script = document.createElement( "script" );
      script.src = "https://maps.google.com/maps/api/js";
      var firstScript = document.getElementsByTagName( "script" )[ 0 ];
      firstScript.parentNode.insertBefore( script, firstScript )
      ;
  }

  originInput.load = function() {
      // Apply the script inject in the next tick of the event loop. This
      // will give AngularJS time to safely finish its compile and linking.
      $timeout( loadSync, 0, false );
  };

}]);

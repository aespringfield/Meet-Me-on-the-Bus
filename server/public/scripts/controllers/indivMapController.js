myApp.controller('IndivMapController', ['$location', 'PersonService', function ($location, PersonService) {
  let indivMap = this;

  let groupManager = PersonService.userControl.mainUser.currentTrip.groupManager;
  let person = groupManager.focusPerson;
  indivMap.person = person;

  let home = {lat: 44.963376, lng: -93.272385};

  let map = new google.maps.Map(document.getElementById('indiv-map'), {
    center: home,
    zoom: 15,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: true,
    rotateControl: false,
    fullscreenControl: false
  });

  // move to route class
  let findBounds = function(person) {
    let bounds = {
      northeastLat: person.route.bounds.northeast.lat,
      northeastLng: person.route.bounds.northeast.lng,
      southwestLat: person.route.bounds.southwest.lat,
      southwestLng: person.route.bounds.southwest.lng
    };
    return bounds;
  };

  let drawPolylines = function(person) {
    let routeCoordinates = google.maps.geometry.encoding.decodePath(person.route.overview_polyline.points);
    let routePath = new google.maps.Polyline({
      map: map,
      path: routeCoordinates,
      strokeColor: person.color,
      strokeOpacity: 0.75,
      strokeWeight: 3
    });
  };

  let shiftMapBounds = function(bounds) {
    let ne = new google.maps.LatLng(bounds.northeastLat, bounds.northeastLng);
    let sw = new google.maps.LatLng(bounds.southwestLat, bounds.southwestLng);
    let latLngBounds = new google.maps.LatLngBounds()
    latLngBounds.extend(ne);
    latLngBounds.extend(sw);
    map.fitBounds(latLngBounds);
  };

  indivMap.fillMap = function(person) {
    drawPolylines(person);
    let bounds = findBounds(person);
    shiftMapBounds(bounds);
  };

  indivMap.goToDetails = function() {
    $location.path('/indivDetails');
  };

}]);

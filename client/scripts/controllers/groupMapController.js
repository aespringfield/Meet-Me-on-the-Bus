myApp.controller('GroupMapController', ['PersonService', function (PersonService) {
  let groupMap = this;

  let groupManager = PersonService.userControl.mainUser.currentTrip.groupManager;

  groupMap.respondees = groupManager.getByResponded().respondeeArray;

  let home = {lat: 44.963376, lng: -93.272385};

  let map = new google.maps.Map(document.getElementById('map'), {
      center: home,
      zoom: 15,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: true,
      rotateControl: false,
      fullscreenControl: false
    });

  let pickColors = function(respondees) {
    for (let i = 0; i < respondees.length; i++) {
      let respondee = respondees[i];
      let numColors = RESPONDEE_COLORS.length;
      if (i < numColors) {
        respondee.color = RESPONDEE_COLORS[i];
      } else {
        respondee.color = RESPONDEE_COLORS[i - numColors];
      }
    }
  };

  let findBounds = function(respondees) {
    let northeastLat;
    let northeastLng;
    let southwestLat;
    let southwestLng;
    for (let i = 0; i < respondees.length; i++) {
      let respondee = respondees[i];
      let resBounds = respondee.route.bounds;
      if (!northeastLat || resBounds.northeast.lat > northeastLat) {
        northeastLat = resBounds.northeast.lat;
      }
      if (!northeastLng || resBounds.northeast.lng > northeastLng) {
        northeastLng = resBounds.northeast.lng;
      }
      if (!southwestLat || resBounds.southwest.lat < southwestLat) {
        southwestLat = resBounds.southwest.lat;
      }
      if (!southwestLng || resBounds.southwest.lng < southwestLng) {
        southwestLng = resBounds.southwest.lng;
      }
    }

    let bounds = {
      northeastLat: northeastLat,
      northeastLng: northeastLng,
      southwestLat: southwestLat,
      southwestLng: southwestLng
    };
    return bounds;
  }

  groupMap.fillMap = function(respondees) {
    pickColors(respondees);
    drawPolylines(respondees);
    let bounds = findBounds(respondees);
    shiftMapBounds(bounds);
  };

  let drawPolylines = function(respondees) {
    for (let i = 0; i < respondees.length; i++) {
      let respondee = respondees[i];
      let routeCoordinates = google.maps.geometry.encoding.decodePath(respondee.route.overview_polyline.points);
      let routePath = new google.maps.Polyline({
        map: map,
        path: routeCoordinates,
        strokeColor: respondee.color,
        strokeOpacity: 0.75,
        strokeWeight: 3
      });
    }
  };

  let shiftMapBounds = function(bounds) {
    let ne = new google.maps.LatLng(bounds.northeastLat, bounds.northeastLng);
    let sw = new google.maps.LatLng(bounds.southwestLat, bounds.southwestLng);
    let latLngBounds = new google.maps.LatLngBounds()
    latLngBounds.extend(ne);
    latLngBounds.extend(sw);
    map.fitBounds(latLngBounds);
  };



}]);

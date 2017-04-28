class Location {

  // properties pulled from JSON data provided by Google Maps API.
  // address_components is an object; lat & lng are numbers, rest are strings
  constructor (address_components, formatted_address, lat, lng, place_id) {
    this.address_components = address_components;
    this.formatted_address = formatted_address;
    this.lat = lat;
    this.lng = lng;
    this.place_id = place_id;
  }

  // other stuff pulled from Places?

}

// the thing I was previously calling RouteParams
class Origin extends Location {

  // location is an object
  constructor (location, earliestDepartTime) {
    super (location);
    this.earliestDepartTime = earliestDepartTime;
    this.type = 'origin';
  }
 }

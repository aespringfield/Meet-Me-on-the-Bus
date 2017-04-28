class Location {

  // address_components is an object; lat & lng are numbers, rest are strings
  constructor (address_components, formatted_address, lat, lng, place_id) {
    this.address_components = address_components;
    this.formatted_address = formatted_address;
    this.lat = lat;
    this.lng = lng;
    this.place_id = place_id;
  }

  // properties pulled from JSON data from result of Google Maps Geocoder API.
  setFrom(result) {
    this.address_components = result.address_components;
    this.formatted_address = result.formatted_address;
    this.lat = result.geometry.location.lat;
    this.lng = result.geometry.location.lng;
    this.place_id = result.place_id;
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

  setEarliestDepartTime(date) {
    this.earliestDepartTime = date;
    return this.earliestDepartTime;
  }

 }

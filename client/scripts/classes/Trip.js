class Trip {

  constructor (destination, desiredEta, eta) {
    this.destination = destination;
    this.desiredEta = desiredEta;
    this.eta = eta;
    this.groupManager = new GroupManager();
  }

  // setDestination(address) {
  //   let geocodeResults = Utilities.geocode(address);
  //   this.destination = geocodeResults;
  //   return this.destination;
  // }
  setDestination(destination) {
    this.destination = destination;
    return this.destination;
  }

  getDestination() {
    return this.destination;
  }

  // should this be wrapped into a destination object?
  setDesiredEta(desiredEta) {
    this.desiredEta = desiredEta;
    return this.desiredEta;
  }

  // should this be wrapped into a destination object?
  getDesiredEta() {
    return this.desiredEta;
  }

  setEta(eta) {
    this.eta = eta;
    return this.eta;
  }

  getEta() {
    return this.eta;
  }

  createSearchForm(trip) {
    let address, date, searchForm;
    if (trip.destination && trip.desiredEta) {
      address = trip.destination.formatted_address;
      date = trip.desiredEta;
      searchForm = new SearchForm(address, date);
    } else {
      address = '';
      date = new Date();
      searchForm = new SearchForm(address, date);
    }
    return searchForm;
  }

  // saveTrip() (creates object with info to store and POSTS to DB)

  // calls setEta() to update ETA sends PUT request to DB with updated ETA and group data)
  // updateTripEta()

  // calls setDestination() and setDesiredEta()
  // will eventually save to DB
  updateTripDestination(address, date){
    setDestination(address);
    setDesiredEta(date);
  }


}

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

  setEtaToLatest() {
    let latestEta = this.groupManager.findLastIndivEta();
    this.setEta(latestEta);
    return this.getEta();
  }

  // clean these two up by combining them and determining which class they should live in
  createDestSearchForm(trip) {
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
  createOriginSearchForm(person) {
    let address, date, searchForm;
    if (person.origin.formatted_address && person.origin.earliestDepartTime) {
      address = person.origin.formatted_address;
      date = person.origin.earliestDepartTime;
      searchForm = new SearchForm(address, date);
    } else {
      address = '';
      date = new Date();
      searchForm = new SearchForm(address, date);
    }
    return searchForm;
  }

  // takes an InvitedPerson and creates an object with the parameters
  // needed to pass to the server for a Google Maps Directions API request
  // searchBy is a string -- either 'departure_time' or 'arrival_time'
  createDirectionsParams(person, searchBy) {
    let date;
    if (searchBy === 'departure_time') {
      date = person.origin.earliestDepartTime;
    } else if (searchBy === 'arrival_time') {
      date = this.eta;
    }

    let directionsParams = {
      origin: person.origin.formatted_address,
      destination: this.destination.formatted_address,
      date: date,
      searchBy: searchBy
    };
    return directionsParams;
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

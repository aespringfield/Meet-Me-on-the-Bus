class Trip {

  constructor (destination = {}, desiredEta = {}, eta = {}) {
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

  setEta(eta) {
    this.eta = eta;
    return this.eta;
  }

  getEta() {
    return this.eta;
  }

    // saveTrip() (creates object with info to store and POSTS to DB)

    // updateTrip() (calls setEta() to update ETA and sends PUT request to
      //with updated ETA and group data)
}

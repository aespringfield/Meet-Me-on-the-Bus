class SearchForm {

  constructor (address, date) {
    this.address= address;
    this.date = date;
    this.addressError = false;
    this.dateError = false;
    this.tempDestination;
  }

  checkInput (address, date) {
    let validInput;
    if (address && date) {
      validInput = true;
    } else {
      validInput = false;
      if (!date) {
        this.dateError = true;
      }
      if (!address) {
        this.addressError = true;
      }
    }
    return validInput;
  }

  // temporarily store geocode object from GoogleMaps API before it is saved to currentTrip
  setTempDestination(destination) {
    this.tempDestination = destination;
    return this.tempDestination;
  }

  getTempDestination() {
    return this.tempDestination;
  }


  // setTripInfo(address, date) {
  //   setDestination(address);
  //   setDesiredEta(date);
  // };
  //
  // let setDestination = function(address) {
  //   let addressObject = {address: address};
  //   $http.post('/geocode/search', addressObject).then(function(response) {
  //     let result = response.data.results[0];
  //     destination.trip.setDestination(result);
  //   });
  // };
  //
  // let setDesiredEta = function(date) {
  //   destination.trip.setDesiredEta(date);
  // };



}

class SearchForm {

  constructor (address = '', date = '') {
    this.address= address;
    this.date = date;
  }

  geocodeAddress() {
    $http.post('/geocode/' + this.address).then(function(response) {
      console.log(response);
    });
  }
}

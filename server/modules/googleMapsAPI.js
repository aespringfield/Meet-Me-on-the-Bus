var express = require('express');
var GoogleMapsAPI = require('googlemaps');

console.log('google maps api hooked in');

var config = {
  key: 'AIzaSyC1z0jkEeeLyD8_ly3-X78LNSrfffXvaf0',
  encode_polylines: false,
  secure: true
};

var googleMapsAPI = new GoogleMapsAPI(config);

var geocodeParams = {
  'address': '',
  'language': 'en',
  'region': 'us'
};

// make request to Google Maps API for address string
function searchAddress(address, callback) {
  var geocodeParams = {
    'address': address,
    'language': 'en',
    'region': 'us'
  };

  googleMapsAPI.geocode(geocodeParams, function(err, result) {
    console.log(result);
    return callback(result)
  });
}

// var googleMapsAPI = new GoogleMapsAPI();

module.exports = searchAddress;

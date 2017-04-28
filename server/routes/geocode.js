var express = require('express');
var router = express.Router();
var passport = require('passport');
var searchAddress = require('../modules/googleMapsAPI');
var GoogleMapsAPI = require('googlemaps');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

var config = {
  key: 'AIzaSyC1z0jkEeeLyD8_ly3-X78LNSrfffXvaf0',
  encode_polylines: false,
  secure: true
};

var googleMapsAPI = new GoogleMapsAPI(config);

router.post('/search', function(req, res) {
  console.log(req.body);
  console.log(req.body.address);
  var address = req.body.address;
  var geocodeParams = {
    'address': address,
    'language': 'en',
    'region': 'us'
  };
  googleMapsAPI.geocode(geocodeParams, function(err, result) {
    console.log(result);
    res.send(result);
  });
});

module.exports = router;

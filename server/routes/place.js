var express = require('express');
var router = express.Router();
var passport = require('passport');
var API_KEY = require('../modules/apiKey');
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
  key: API_KEY,
  encode_polylines: false,
  secure: true
};

var googleMapsAPI = new GoogleMapsAPI(config);


router.get('/:place_id', function(req, res) {
  console.log(req.params);
  var place_id = req.params.place_id;
  var placeParams = {
    'placeid': place_id,
    'language': 'en'
  }
  googleMapsAPI.placeDetails(placeParams, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send(result);
  })
});

module.exports = router;

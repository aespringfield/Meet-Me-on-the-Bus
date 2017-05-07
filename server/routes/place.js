var express = require('express');
var router = express.Router();
var passport = require('passport');
var API_KEY = require('../modules/apiKey');
var GoogleMapsAPI = require('googlemaps');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

var config = {
  key: process.env.GM_API_KEY || API_KEY,
  encode_polylines: false,
  secure: true
};

var googleMapsAPI = new GoogleMapsAPI(config);


router.get('/:place_id', function(req, res) {
  var place_id = req.params.place_id;
  var placeParams = {
    'placeid': place_id,
    'language': 'en'
  }
  googleMapsAPI.placeDetails(placeParams, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
});

module.exports = router;

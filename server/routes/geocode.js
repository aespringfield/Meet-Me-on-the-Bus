var express = require('express');
var router = express.Router();
var passport = require('passport');
var searchAddress = require('../modules/googleMapsAPI');

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

router.get('/:address', function(req, res) {
  console.log(req.body);
  console.log(req.body.address);
  var address = req.body.address;
  var result = searchAddress(address);
  res.send(result);
});

module.exports = router;

// Controls management of user info and friends
myApp.factory('PersonService', ['$http', '$location', '$route', function($http, $location, $route){
  let code = {};


  // make userControl its own class?
  let userObject = {};
  let userControl = {
    mainUser: new MainUser()
  };


  let findInvitedPerson = function(keyName, keyValue) {
    return userControl.mainUser.currentTrip.groupManager.findPerson(keyName, keyValue);
  };

  // move to utilities?
  let instantiateMainUser = function(response) {
    userControl.mainUser = new MainUser(response.data.firstName, response.data.lastName, response.data.username)
    console.log('Email: ', userControl.mainUser.getEmail(), '\n',
    'Name: ', userControl.mainUser.getFullName());
    console.log(userControl.mainUser);
    let invitedMainUser = userControl.mainUser.currentTrip.groupManager.invite(userControl.mainUser, true);
    userControl.mainUser.currentTrip.groupManager.setFocusPerson(invitedMainUser);
  };

  // move to class?
  // origin & destination are formatted addresses
  // date is seconds since 1/1/1970
  // searchBy is either 'arrival_time' or 'departure_time'
  let requestRoute = function(directionsParams, trip, callback) {
    $http.post('/directions/getRoute', directionsParams).then(function(response) {
      let directionsObject = response.data;
      console.log(directionsObject);
      console.log('trip is', trip);
      let person = trip.groupManager.getFocusPerson();
      person.setRoute(directionsObject);
      let oldEta = trip.eta;
      trip.setEtaToLatest();
      if (oldEta < trip.eta) {
        let respondees = trip.groupManager.getByResponded().respondeeArray;
        for (let i = 0; i < respondees.length; i++) {
          if (respondees[i].route.getArrivalTime('value') < trip.eta) {
            console.log('later');
            requestNewRoute(respondees[i], trip);
          }
        }
      } else {
        console.log('earlier');
        requestNewRoute(person, trip);
      }
      if (callback) {
        callback();
      }
    });
  };

  let requestNewRoute = function(person, trip) {
    trip.groupManager.setFocusPerson(person);
    let directionsParams = trip.createDirectionsParams(person, 'arrival_time');
    $http.post('/directions/getRoute', directionsParams).then(function(response) {
      let directionsObject = response.data;
      person.setRoute(directionsObject);
      console.log(directionsObject);
      console.log('trip is', trip);
    })
  };

  let getSteps = function(person) {
    return person.route.getSteps();
  }

  let getUser = function(callback){
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a current session on the server
            userObject.userName = response.data.username;
            userObject.id = response.data._id;
            console.log('User Data: ', userObject.userName);
            if (callback) {
              callback(response);
            }
        } else {
            // store the activation code for later use
            code.tempCode = $route.current.params.code;
            console.log('Activation code: ', $route.current.params.code);
            // user has no session, bounce them back to the login page
            $location.path('/home');
        }
    });
  };

  let logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      userObject.name = '';
      userObject.id = '';
      PersonService.code.tempCode = undefined;
      $location.path('/home');
    })
  };

  let goTo = function(file) {
    $location.path(file);
  }

  let searchAddress = function(address) {
    let addressObject = {address: address};
    return $http.post('/geocode/search', addressObject).then(function(response) {
      result = response.data.results[0];
      console.log(result);
      return result;
    }, function(error) {
      console.log(error);
    });
  };

  let setTripInfo = function(searchForm) {
    let address = searchForm.address;
    let date = searchForm.date;
    let trip = userControl.mainUser.currentTrip;
    let validInput = searchForm.checkInput(address, date);
    if (validInput) {
      searchAddress(address).then(function(result) {
        console.log('after search');
        trip.setDestination(result);
        console.log(trip);
      });
      trip.setDesiredEta(date);
      console.log("in setTripInfo trip is", trip);
    }
  }

  return {
    code: code,
    userObject: userObject,
    userControl: userControl,
    findInvitedPerson: findInvitedPerson,
    requestRoute: requestRoute,
    getSteps: getSteps,
    getUser: getUser,
    instantiateMainUser: instantiateMainUser,
    logout: logout,
    goTo: goTo,
    setTripInfo: setTripInfo
  };
}]);

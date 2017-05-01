// Controls management of user info and friends
myApp.factory('PersonService', ['$http', '$location', function($http, $location){
  // let mainUser = new MainUser('Lucinda', 'Williams', 'lucinda@lucinda.com');

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
      }
      if (callback) {
        callback();
      }
    });
  };

  let requestNewRoute = function(person, trip) {
    trip.groupManager.setFocusPerson(person);
    let directionsParams = trip.createDirectionsParams(person, 'arrival_time');
    requestRoute(directionsParams, trip);
  };

  let getSteps = function(person) {
    return person.route.getSteps();
  }

  let getUser = function(callback){
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a current session on the server
            userObject.userName = response.data.username;
            if (callback) {
              callback(response);
            }
        } else {
            // user has no session, bounce them back to the login page
            $location.path('/home');
        }
    });
  };

  return {
    userObject: userObject,
    userControl: userControl,
    findInvitedPerson: findInvitedPerson,
    requestRoute: requestRoute,
    getSteps: getSteps,
    getUser: getUser,
    instantiateMainUser: instantiateMainUser
  };
}]);

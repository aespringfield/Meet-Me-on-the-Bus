// Controls management of user info and friends
myApp.factory('PersonService', ['$http', '$location', function($http, $location){
  let mainUser = new MainUser('Lucinda', 'Williams', 'lucinda@lucinda.com');

  // make userControl its own class?
  userControl = {}

  userObject = {};
  mainUser.currentTrip.groupManager.invite(mainUser, true, true);

  console.log(mainUser);

  let findInvitedPerson = function(keyName, keyValue) {
    return mainUser.currentTrip.groupManager.findPerson(keyName, keyValue);
  };

  // move to utilities?
  // currently this is not being used
  let instantiateMainUser = function(user) {
    userControl.mainUser = new MainUser(user.firstName, user.lastName, user.username);
    return mainUser;
  }

  // move to class?
  // origin & destination are formatted addresses
  // date is milliseconds since 1/1/1970
  // searchBy is either 'arrival_time' or 'departure_time'
  let requestRoute = function(routeObject, person, callback) {
    let directionsParams = {
      origin: routeObject.origin,
      destination: routeObject.destination,
      date: routeObject.date,
      searchBy: routeObject.searchBy,
    };
    $http.post('/directions/getRoute', directionsParams).then(function(response) {
      let directionsObject = response.data;
      console.log(directionsObject);
      person.setRoute(directionsObject);
      callback();
    });
  };

  let getSteps = function(person) {
    return person.route.getSteps();
  }

  let getUser = function(){
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a current session on the server
            userObject.userName = response.data.username;
            userControl.mainUser = new MainUser(response.data.firstName, response.data.lastName, response.data.username)
            console.log('Email: ', userControl.mainUser.getEmail(), '\n',
            'Name: ', userControl.mainUser.getFullName());
        } else {
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    });
  };

  return {
    userObject: userObject,
    mainUser: mainUser,
    findInvitedPerson: findInvitedPerson,
    requestRoute: requestRoute,
    getSteps: getSteps,
    getUser: getUser
  };
}]);

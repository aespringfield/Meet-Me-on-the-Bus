// Controls management of user info and friends
myApp.factory('PersonService', ['$http', '$location', function($http, $location){
  let mainUser = new MainUser('Lucinda', 'Williams', 'lucinda@lucinda.com');

  mainUser.currentTrip.groupManager.invite(mainUser, true, true);

  console.log(mainUser);

  let findPerson = function(keyName, keyValue) {
    return mainUser.currentTrip.groupManager.findPerson(keyName, keyValue);
  };



  // store this in appropriate class
  // origin & destination are formatted addresses
  // date is milliseconds since 1/1/1970
  // searchBy is either 'arrival_time' or 'departure_time'
  let getRoute = function(origin, destination, date, searchBy) {
    let directionsParams = {
      origin: origin,
      destination: destination,
      date: date,
      searchBy: searchBy,
    };
    $http.post('/directions/getRoute', directionsParams).then(function(response) {
      let results = response.data;
      console.log(results);
    });
  };

  return {
    mainUser: mainUser,
    findPerson: findPerson,
    getRoute: getRoute
  };
}]);

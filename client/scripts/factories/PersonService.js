// Controls management of user info and friends
myApp.factory('PersonService', ['$http', '$location', function($http, $location){
  let mainUser = new MainUser('Lucinda', 'Williams', 'lucinda@lucinda.com');

  mainUser.currentTrip.groupManager.invite(mainUser, true, true);

  console.log(mainUser);

  return {
    mainUser
  }
}]);

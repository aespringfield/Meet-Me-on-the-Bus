// Controls management of user info and friends
myApp.factory('PersonService', ['$http', '$location', function($http, $location){
  let mainUser = new MainUser('Lucinda', 'Williams', 'lucinda@lucinda.com');

  return {
    mainUser
  }
}]);

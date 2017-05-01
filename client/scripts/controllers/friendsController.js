myApp.controller('FriendsController', ['$http', '$location', 'UserService', 'PersonService', 'moment', function ($http, $location, UserService, PersonService, moment) {
  friends = this;
  let trip = PersonService.mainUser.currentTrip;
  let friendsManager = PersonService.mainUser.friendsManager;

  friends.peopleArray = friendsManager.peopleArray;

  // move to factory?
  friends.goTo = function(file) {
    $location.path(file);
  };

  friends.save = function() {
    let friend = new Person(this.firstName, this.lastName, this.email);
    friendsManager.add(friend);
    friends.goTo('/addFriends');
  };

  friends.addOriginFor = function(friend) {
    trip.groupManager.focusPerson = trip.groupManager.invite(friend);
    friends.goTo('/originInput');
  }



}]);

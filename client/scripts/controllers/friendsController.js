myApp.controller('FriendsController', ['$http', '$location', 'UserService', 'PersonService', 'moment', function ($http, $location, UserService, PersonService, moment) {
  friends = this;
  let trip = PersonService.userControl.mainUser.currentTrip;
  let friendsManager = PersonService.userControl.mainUser.friendsManager;

  friends.peopleArray = friendsManager.peopleArray;

  // move to factory?
  friends.goTo = function(file) {
    $location.path(file);
  };

  friends.save = function() {
    let friend = new Person(this.firstName, this.lastName, this.email);
    friendsManager.add(friend);
    // friends.goTo('/addFriends');
    friends.addOriginFor(friend);
  };

  friends.addOriginFor = function(friend) {
    let invitedFriend = trip.groupManager.findPerson('email', friend.email);
    console.log('invitedFriend is', invitedFriend);
    if (invitedFriend) {
      trip.groupManager.focusPerson = invitedFriend;
    } else if (!invitedFriend) {
      trip.groupManager.focusPerson = trip.groupManager.invite(friend);
    }
    friends.goTo('/originInput');
  }



}]);

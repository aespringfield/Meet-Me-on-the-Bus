myApp.controller('GroupPlanController', ['$http', 'PersonService', 'moment', function ($http, PersonService, moment) {
  let groupPlan = this;
  let mainUser = PersonService.userControl.mainUser;
  let trip = mainUser.currentTrip;
  let groupManager = trip.groupManager;
  groupPlan.group = groupManager.peopleArray;
  groupPlan.eta = moment(trip.eta).format('h:mm a');
  groupPlan.destination = trip.destination.formatted_address;

  // make this send mail to all friends who are not main user
  // then figure out how to make it send that user's route info
  // then figure out how to make it send a link to view that user's route
  groupPlan.sendToFriends = function() {
    let subUsers = groupManager.getSubUsers();
    for (let i = 0; i < subUsers.length; i++) {
      sendMail(subUsers[i]);
    }
  };

  let getInstructionsString = function(steps) {
    let instructionsString = steps[0].html_instructions;
    for (let i = 1; i < steps.length; i++) {
      instructionsString += '\n ' + steps[i].html_instructions;
    }
    return instructionsString;
  }

  let sendMail = function(friend) {
    let routeInstructions = getInstructionsString(friend.route.steps);
    let mailer = {
      toEmail: [friend.email],
      subject: 'Route from ' + mainUser.firstName,
      message: routeInstructions,
    };
    console.log("mailer is", mailer);
    $http.post('/mail', mailer).then(function(response) {
      console.log(response);
    });
  };
}]);

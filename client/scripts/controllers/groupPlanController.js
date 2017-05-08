myApp.controller('GroupPlanController', ['$http', '$location', 'PersonService', 'moment', function ($http, $location, PersonService, moment) {
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

  groupPlan.viewRouteDetails = function(person) {
    groupManager.setFocusPerson(person);
    $location.path('/indivDetails');
  };

  groupPlan.viewGroupMap = function() {
    $location.path('/groupMap');
  }

  let getInstructionsString = function(steps) {
    let instructionsString = ''
    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      if (i > 0) {
        instructionsString += '\n\n';
      }
      if (step.getMode() === 'TRANSIT') {
        instructionsString += 'Take the ' + step.getRouteName() + '\n';
        instructionsString += 'Depart at: ' + step.getDepartureTime() + '\n';
        instructionsString += 'Leave from: ' + step.getDepartureStop() + '\n';
        instructionsString += '\n';
        instructionsString += 'Arrive at: ' + step.getArrivalTime() + '\n';
        instructionsString += 'Get off at: ' + step.getArrivalStop();
      } else if (step.getMode() === 'WALKING') {
        instructionsString += step.getInstructions() + ' (' + step.getDuration('text') + ')';
      }
      return instructionsString;
    }
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

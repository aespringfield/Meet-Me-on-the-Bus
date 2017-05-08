myApp.controller('GroupPlanController', ['$http', '$location', 'PersonService', 'moment', function ($http, $location, PersonService, moment) {
  let groupPlan = this;
  let mainUser = PersonService.userControl.mainUser;
  let trip = mainUser.currentTrip;
  let groupManager = trip.groupManager;
  groupPlan.trip = trip;
  groupPlan.group = groupManager.peopleArray;
  groupPlan.eta = moment(trip.eta).format('h:mm a');
  groupPlan.enteredDestination = trip.getEnteredDestName();


  // make this send mail to all friends who are not main user
  // then figure out how to make it send that user's route info
  // then figure out how to make it send a link to view that user's route
  groupPlan.sendToFriends = function() {
    let subUsers = groupManager.getSubUsers();
    for (let i = 0; i < subUsers.length; i++) {
      sendMail(subUsers[i], groupPlan.trip);
    }
  };

  groupPlan.viewRouteDetails = function(person) {
    groupManager.setFocusPerson(person);
    $location.path('/indivDetails');
  };

  groupPlan.viewGroupMap = function() {
    $location.path('/groupMap');
  }

  let getInstructionsString = function(person) {
    let steps = person.route.steps;
    let instructionsString = ''
    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      if (i > 0) {
        instructionsString += ' \ \ ';
      }
      if (step.getMode() === 'TRANSIT') {
        instructionsString += 'Take the ' + step.getRouteName() + ' \ ';
        instructionsString += 'Depart at: ' + step.getDepartureTime() + ' \ ';
        instructionsString += 'Leave from: ' + step.getDepartureStop() + ' \ ';
        instructionsString += '\n';
        instructionsString += 'Arrive at: ' + step.getArrivalTime() + ' \ ';
        instructionsString += 'Get off at: ' + step.getArrivalStop();
      } else if (step.getMode() === 'WALKING') {
        instructionsString += step.getInstructions() + ' (' + step.getDuration('text') + ')';
      }
      return instructionsString;
    }
  };

  let getInstructionsHtml = function(person, trip) {
    let steps = person.route.steps;
    let instructionsHtml = '';
    instructionsHtml += '<p>Your whole group will arrive at ' + trip.getEnteredDestName() + ' by <b>' + groupPlan.eta + '</b>.</p><br>';
    instructionsHtml += '<p>You should leave at <b>' + person.route.getDepartureTime('text') + '</b>.</p><br>'
    for (let i = 0; i < steps.length; i++) {
      let step = steps[i];
      if (i > 0) {
        instructionsHtml += '<br>';
      }
      if (step.getMode() === 'TRANSIT') {
        instructionsHtml += '<p><b>' + step.getRouteName() + '</b></p>';
        instructionsHtml += '<p>Depart:</p>';
        instructionsHtml += '<p><b>' + step.getDepartureTime() + '</b> - ' + step.getDepartureStop() + '</p>';
        instructionsHtml += '<p>Arrive:</p>';
        instructionsHtml += '<p><b>' + step.getArrivalTime() + '</b> - ' + step.getArrivalStop() + '</p>';
      } else if (step.getMode() === 'WALKING') {
        instructionsHtml += '<p>' + step.getInstructions() + ' - ' + step.getDuration('text') + '</p>';
      }
    }
    instructionsHtml += '<br><p><b>You will arrive at ' + person.route.getDepartureTime('text') + '</p>';
    return instructionsHtml;
};

  // let getPlace = function(place_id) {
  //   $http.get('/place/' + place_id).then(function(response) {
  //     console.log(response.data);
  //     // trip.placeName =
  //   })
  // }

  let sendMail = function(friend, trip) {
    let instructionsString = getInstructionsString(friend);
    let instructionsHtml = getInstructionsHtml(friend, trip);

    let mailer = {
      toEmail: [friend.email],
      subject: mainUser.firstName + ' sent you a route to ' + trip.getEnteredDestName(),
      message: {
        string: instructionsString,
        html: instructionsHtml
      },
    };
    console.log("mailer is", mailer);
    $http.post('/mail', mailer).then(function(response) {
      console.log(response);
    });
  };
}]);

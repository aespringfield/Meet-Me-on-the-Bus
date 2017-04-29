myApp.controller('IndivDetailsController', ['$http', '$location', 'UserService', 'PersonService', 'moment', '$mdpDatePicker', '$mdpTimePicker', function ($http, $location, UserService, PersonService, moment, $mdpDatePicker, mdpTimePicker) {

  // indivDetails.chooseIcon = function(number) {
  //   if (number % 2 == 0) {
  //     return 'directions_walk';
  //   } else {
  //     return 'directions_bus';
  //   }
  // }

  let indivDetails = this;
  let person = PersonService.findInvitedPerson('mainUser', true);
  indivDetails.route = person.route;
  indivDetails.steps = PersonService.getSteps(person);


  indivDetails.chooseIcon = function(step) {
    let mode = step.getMode();
    let icon;
    switch (mode) {
      case 'WALKING' :
        icon = 'directions_walk';
        break;
      case 'TRANSIT' :
        switch (step.getTransitType()) {
          case 'Bus' :
            icon = 'directions_bus';
            break;
          case 'Light rail' :
            icon = 'directions_transit';
            break;
          default:
            icon = 'directions_transit';
        }
        break;
      default:
        icon = 'directions';
    }
    return icon;
  };



}]);

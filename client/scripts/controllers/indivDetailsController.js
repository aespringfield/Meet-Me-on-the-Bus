myApp.controller('IndivDetailsController', ['UserService', 'PersonService', 'moment', function (UserService, PersonService, moment) {

  let indivDetails = this;
  let person = PersonService.userControl.mainUser.currentTrip.groupManager.focusPerson;
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

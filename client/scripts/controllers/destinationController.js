myApp.controller('DestinationController', ['$scope', 'UserService', 'moment', function ($scope, UserService, moment) {
  let destination = this;
  destination.date = moment();
  destination.moment = moment;
  console.log(destination.date);
  function createTimeArray(moment) {
    let timeArray = [];
    let currentMoment = moment;
    while (timeArray.length < 48) {
      let time = convertToTime(currentMoment);
      timeArray.push(time);
      currentMoment = currentMoment.add(30, 'minutes');
    }
    return timeArray;
  }
  console.log(createTimeArray(destination.date));
  function convertToTime(date) {
    return moment(date).format('LT');
  }
  destination.dateInput = new Date()
  destination.time = convertToTime(destination.date);
  let tim = moment(destination.time, 'LT');
  console.log(tim);
  destination.logout = UserService.logout;
  destination.log = function(thing) {
    console.log("hey");
    console.log(thing);
    console.log(moment(thing));
    console.log(moment(thing).valueOf());
  }

  $scope.currentDate = new Date();
destination.showTimePicker = function(ev) {
  $mdpTimePicker($scope.currentTime, {
    targetEvent: ev
  }).then(function(selectedDate) {
    $scope.currentTime = selectedDate;
  });;
}

}]);

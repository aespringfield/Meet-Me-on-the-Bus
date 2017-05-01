// constructed from object returned from Google Maps API Directions Service
// arrival_time & departure_time are objects with both text and value
// duration is object with both text and value
// steps is array
class Route {
  constructor (directionsObject) {
    this.overview_polyline = directionsObject.routes[0].overview_polyline;
    this.arrival_time = directionsObject.routes[0].legs[0].arrival_time;
    this.departure_time = directionsObject.routes[0].legs[0].departure_time;
    this.duration = directionsObject.routes[0].legs[0].duration;
    this.steps = [];

    let stepsArray = directionsObject.routes[0].legs[0].steps;
    for (let i = 0; i < stepsArray.length; i++) {
      let step = stepsArray[i];
      if (step.travel_mode === "TRANSIT") {
        step = new TransitStep(step);
      } else if (step.travel_mode === "WALKING") {
        step = new WalkingStep(step);
      }
      this.steps.push(step);
    }
  }

  _formatTime(time) {
    time = moment(time, 'h:mma').format('h:mm a');
    return time;
  }

  getSteps() {
    return this.steps;
  }

  getPolyline() {
    return this.overview_polyline;
  }

  // type is 'value' or 'text'
  getArrivalTime(type) {
    let time = this.arrival_time[type];
    this._formatTime(time);
    return time;
  }

  // type is 'value' or 'text'
  getDepartureTime(type) {
    let time = this.departure_time[type];
    this._formatTime(time);
    return time;
  }

  getDurationVal() {
    return this.duration.value;
  }

  getDurationText() {
    return this.duration.text;
  }

}

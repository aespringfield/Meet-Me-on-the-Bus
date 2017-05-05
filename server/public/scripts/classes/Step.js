// duration is object with text &
class Step {
  constructor (step) {
    this.travel_mode = step.travel_mode;
    this.duration = step.duration;
    this.html_instructions = step.html_instructions;
  }

  getMode() {
    return this.travel_mode;
  }

// parameter is either "value" or "text"
  getDuration(type) {
    return this.duration[type];
  }

  getInstructions() {
    return this.html_instructions;
  }

}

class TransitStep extends Step {
  constructor (step) {
    super(step);
    this.departure_time = step.transit_details.departure_time.text;
    this.arrival_time = step.transit_details.arrival_time.text;
    this.departure_stop = step.transit_details.departure_stop.name;
    this.arrival_stop = step.transit_details.arrival_stop.name;
    this.vehicle = step.transit_details.line.vehicle.name;
    this.short_name = step.transit_details.line.short_name;
    this.headsign = step.transit_details.headsign;
  }

  _formatTime(time) {
    time = moment(time, 'h:mma').format('h:mm a');
    return time;
  }

  getDepartureTime() {
    let time = this.departure_time;
    time = this._formatTime(time);
    return time;
  }

  getArrivalTime() {
    let time = this.arrival_time;
    time = this._formatTime(time);
    return time;
  }

  getDepartureStop() {
    return this.departure_stop;
  }

  getArrivalStop() {
    return this.arrival_stop;
  }

  getTransitType() {
    return this.vehicle;
  }

  getRouteName() {
    let routeName = this.short_name;
    if (this.vehicle === 'Light rail') {
      routeName = routeName + ' Line';
    }
    return routeName;
  }

  getRouteInfo() {
    return this.headsign;
  }
}

class WalkingStep extends Step {
  constructor (step) {
    super(step);
  }
}

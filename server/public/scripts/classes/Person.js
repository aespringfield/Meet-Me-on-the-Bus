// superclass for storing/fetching data about a person
// firstName, lastName, and email are all strings
class Person {

  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  // general method for editing a property of a person (firstName, lastName, or email)
  // first parameter is key to access property (e.g. "lastName")
  // second parameter is value you wish to set property to (e.g. "Springfield")
  setProperty(key, value) {
    this[key] = value;
    return this[key];
  }

  getFirstName() {
    return this.firstName;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }

  getEmail() {
    return this.email;
  }

  // private method for taking an initial from a name and making sure it's uppercase
  _getInitial(name) {
    return name[0].toUpperCase();
  }

  // returns initials of person as string (e.g. "AS") for use in certain views
  getInitials() {
    let initials = this._getInitial(this.firstName) +  this._getInitial(this.lastName);
    return initials;
  }

  // returns string with shortened version of full name (e.g. "Anna S.")
  getShortName() {
    let shortName = this.firstName + ' ' + this._getInitial(this.lastName) + '.';
    return shortName;
  }
}

// subclass of person, stores things the user has control over
// add authentication stuff?
// change to extension of SubUser in Phase 3?
class MainUser extends Person  {
  constructor(firstName, lastName, email) {
    super(firstName, lastName, email);
      this.tripsArray = [];
      this.currentTrip = new Trip();
      this.friendsManager = new FriendsManager();
  }

  // saves a currentTrip to the tripsArray
  // (tripsArray will eventually be stored on database--currentTrip will not)
  // clears old currentTrip and instantiantes new, empty Trip object
  storeTrip() {
    this.tripsArray.push(this.currentTrip);
    this.currentTrip = new Trip();
    return this.tripsArray;
  }
}

// class SubUser extends class Person (instantiated when non-main user logs in to respond?)

    // currentTrip

    // will be able to store own route params

class InvitedPerson extends Person {

  // person is an object
  // why using default parameters even when a value is passed in?
  constructor (person, mainUser = false, responded = false) {
    super (person.firstName, person.lastName, person.email);
    this.mainUser = mainUser;
    this.responded = responded;
    this.origin = new Origin();
    this.route = undefined;
  }
    setResponded(value) {
      this.responded = value;
      return this.responded;
    }

    getResponded() {
      return this.responded;
    }

    getOrigin() {
      return this.origin;
    }

    // sets route from data on object sent from Google Maps API Directions Service
    setRoute(directionsObject) {

      this.route = new Route(directionsObject);
      this.setResponded(true);
      console.log(this);
      return this.route;
    }
}

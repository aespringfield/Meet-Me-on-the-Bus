class PeopleManager {

  constructor (peopleArray = []) {
    this.peopleArray = peopleArray;
    this.focusPerson = undefined;
  }

  findPerson(keyName, keyValue) {
    for (let i = 0; i < this.peopleArray.length; i++) {
      let person = this.peopleArray[i];
      if (person[keyName] === keyValue) {
        return person;
      }
    }
    return false;
  }

  add(person) {
    this.peopleArray.push(person);
    return this.peopleArray[this.peopleArray.length-1];
  }

  setFocusPerson(person) {
    this.focusPerson = person;
    return this.focusPerson;
  }

  getFocusPerson(person) {
    return this.focusPerson;
  }

  // remove(person)

}

class FriendsManager extends PeopleManager {

  constructor (peopleArray = []) {
    super(peopleArray);
  }

  // override add(person) to make POST request to DB

  // override remove(keyName, keyValue) to query DB & remove from DB

  // getFriends() sends GET request to retrieve all friends from DB

  // update(person, keyName, keyValue) calls person.setKey(keyName, keyValue) and then makes UPDATE request to DB

}

class GroupManager extends PeopleManager {

  constructor (peopleArray = []) {
    super(peopleArray);
  }

  // constructs new InvitedPerson object from person object and pushes to this.peopleArray
  invite(person, mainUser = false, responded = false) {
    let invitedPerson = new InvitedPerson(person, mainUser, responded);
    return this.add(invitedPerson);
  }

  // returns the ETA of the individual who is currently scheduled to arrive last
  findLastIndivEta() {
    let latestEta = this.focusPerson.route.getArrivalTime('value');
    console.log("eta is", latestEta);
    if (this.peopleArray.length > 1) {
      for (let i = 0; i < this.peopleArray.length; i++) {
        let currentEta = this.peopleArray[i].route.getArrivalTime('value');
        console.log(this.peopleArray[i].firstName +'\'s arrival time is ' + currentEta);
        if (currentEta > latestEta) {
          latestEta = currentEta;
          console.log('oop! that\'s later');
        }
      }
    }
    return latestEta;
  }

  // returns an array of users who are not the main user
  getSubUsers() {
    let subUsers = [];
    for (let i = 0; i < this.peopleArray.length; i++) {
      let person = this.peopleArray[i];
      if (person.mainUser === false) {
        subUsers.push(person);
      }
    }
    return subUsers;
  }

  // returns an object containing two arrays:
    // respondeeArray : array of people from peopleArray who have responded
    // nonRespondeeArray : array of people from peopleArray who have not responded
  getByResponded() {
    let respondeeArray = [];
    let nonRespondeeArray = [];
    for (let i = 0; i < this.peopleArray.length; i++) {
      let person = this.peopleArray[i];
      if (person.responded) {
        respondeeArray.push(person);
      } else if (!person.responded) {
        nonRespondeeArray.push(person);
      }
    }
    return {
      respondeeArray,
      nonRespondeeArray
    }
  }
}

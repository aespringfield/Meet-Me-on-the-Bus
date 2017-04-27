// class PeopleManager

  // constructor (peopleArray = [])

  // findPerson(keyName, keyValue)

  // add(person)

  // remove(person)

// class FriendsManager extends PeopleManager

  // constructor ()

  // override add(person) to make POST request to DB

  // override remove(keyName, keyValue) to query DB & remove from DB

  // getFriends() sends GET request to retrieve all friends from DB

  // update(person, keyName, keyValue) calls person.setKey(keyName, keyValue) and then makes UPDATE request to DB

// class GroupManager extends PeopleManager

  // constructor ()

  // invite(person) constructs new InvitedPerson object from person object and pushes to this.peopleArray

  // getPeopleByResponded() returns an object containing two arrays:
    // respondeeArray : array of people from peopleArray who have responded
    // nonRespondeeArray : array of people from peopleArray who have not responded

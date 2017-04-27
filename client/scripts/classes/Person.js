// Utilities

  // constructor()

  // static registerUser(firstName, lastName, email, password) (saves user to DB)

  // static retrieveUser() (retrieves user data from DB and instantiates MainUser)

// class Person

  // constructor (firstName, lastName, email)

  // setKey(keyName, keyValue)

  // getFirstName()

  // getEmail()

  // getInitials()

  // getNameShort()

// class MainUser extends class Person  - change to extension of SubUser in Phase 3?

  // constructor (firstName, lastName, email)

     // super(firstName, lastName, email)

     // friendsManager : new FriendsManager

     // tripsArray

     // currentTrip

     // authenticatey thing?

// class SubUser extends class Person (instantiated when non-main user logs in to respond?)

    // currentTrip

    // will be able to store own route params

// class InvitedPerson extends person

  // constructor (person, responded = false)

    // super (person.firstName, person.lastName, person.email)

    // route : {}

    // routeParams

    // setResponded()

    // getResponded()

    // getRouteParams()

    // setRouteParams() - instantiates RouteParams object and stores in routeParams property

// class Trip

  // constructor (destination = {}, desiredEta = {} eta = {})

    // groupManager : new GroupManager

    // setEta(eta)

    // getEta()

    // saveTrip() (creates object with info to store and POSTS to DB)

    // updateTrip() (calls setEta() to update ETA and sends PUT request to
      //with updated ETA and group data)

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

// class RouteParams

// class Route

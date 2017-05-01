// contains static functions for managing high-level app functioning
class Utilities {
  constructor(){}

  // creates new user and saves to database
  // user is an object containing username and password
  // need to change username to email
  static registerUser(user, firstName, lastName) {
    if (user.username === '' || user.password === '') {
      return "Please enter an email address and create a password";
    } else {
      console.log('sending to server...', user);
      $http.post('/register', user).then(function(response) {
        console.log('success');
        $location.path('/home');
      },
      function(response) {
        console.log('error');
        return "Please try again";
      });
    }
  }

  // retrieves user data from DB and instantiates MainUser
  static retrieveUser(){
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a current session on the server
            userObject.userName = response.data.username;
            console.log('User Data: ', userObject.userName);
        } else {
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    });
  }

  static geocode(address) {
    $http.post('/geocode/' + this.address).then(function(response) {
      console.log(response);
      return response;
    });
  }

}

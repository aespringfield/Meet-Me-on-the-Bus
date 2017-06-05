# Meet-Me-on-the-Bus
An app for helping groups of people meet up via transit. Solves a problem with which many regular transit riders are very familiar: you and your friends are meeting up, and you all left when you got off work, but your bus routes take different amounts of time. When you arrive at the location--a restaurant, say--your friends haven't made it there yet, and you can't get seated without your party. How dreadful!

This app lets a user plan ahead for just these sorts of situations. It pulls from the functionality that the Google Maps Directions Service API offers for planning a single route, and it adds in the context of other routes and their arrival times.

## How to use it
Register as a new user and log into the app. Pick a destination at which a group of two or more people will be meeting, and then enter your own origin and earliest desired time of departure. You'll then be asked to enter as many friends as you like to join your trip. Add their info and points of origin. Once you indicate you're done, you'll see an arrival time for the group. This arrival time is calculated based on the time that the last friend will arrive, and all other routes returned are as close to that arrival time as possible. You'll be able to browse through directions and maps for each person's routes and, if you so choose, send your friends an email detailing their individual route.

Check it out live here: https://meetmeonthebus.herokuapp.com

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [npm](https://www.npmjs.com/) - Package manager for JavaScript
* [Grunt](https://gruntjs.com/) - JavaScript task runner
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [MongoDB](https://www.mongodb.com/) - Database used

### Installing

Download files

Install dependencies

```
$ npm install
```

Run Grunt in the root directory

```
$ grunt
```

Start a local server

```
$ npm start
```

Access the local installation via localhost.

## Deployment

Deployed using hosting by [Heroku](https://www.heroku.com/) and [mlab](https://mlab.com/).

## Built With

* [AngularJS](https://angularjs.org/) - JavaScript framework
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Express](https://expressjs.com/) - Node.js framework
* [MongoDB](https://www.mongodb.com/) - Database used
* [Google Maps API - Directions Service](https://developers.google.com/maps/documentation/javascript/directions) - API for finding transportation routes
* [Google Maps API - Geocoding Service](https://developers.google.com/maps/documentation/javascript/geocoding) - - API for finding address information and geographical coordinates for locations
* [Angular Material](https://material.angularjs.org/latest/) - Styling framework
* [Passport](http://passportjs.org/) - Authentication for Node.js
* [Moment.js](https://momentjs.com/) - JavaScript library for parsing and displaying times
* [npm](https://www.npmjs.com/) - Dependency management
* [Grunt](https://gruntjs.com/) - Task runner

## Author

* [**Anna Springfield**](https://github.com/aespringfield)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Kris Szafranski for creating the Passport authentication code adapted for this project.
* Thanks to Scott Bromander, Chris Black and Luke Schlangen for providing oversight during scoping and development.
* Thanks to Y Paul Sussman, Nic Wilson, Betsy Rowley, Dan Zera, and Anisa Abdulkadir for providing peer support during the development process.

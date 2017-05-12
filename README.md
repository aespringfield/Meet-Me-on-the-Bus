# Meet-Me-on-the-Bus
An app for helping groups of people meet up via transit. Solves a problem with which many regular transit riders are very familiar: you and your friends are meeting up, and you all left when you got off work, but your bus routes take different amounts of time. When you arrive at the location--a restaurant, say--your friends haven't made it there yet, and you can't get seated without your party. How dreadful!

This app lets a user plan ahead for just these sorts of situations. It pulls from the functionality that the Google Maps Directions Service API offers for planning a single route, and it adds in the context of other routes and their arrival times. 

## How to use it
Register as a new user and log into the app. Pick a destination at which a group of two or more people will be meeting, and then enter your own origin and earliest desired time of departure. You'll then be asked to enter as many friends as you like to join your trip. Add their info and points of origin. Once you indicate you're done, you'll see an arrival time for the group. This arrival time is calculated based on the time that the last friend will arrive, and all other routes returned are as close to that arrival time as possible. You'll be able to browse through directions and maps for each person's routes and, if you so choose, send your friends an email detailing their individual route.

Check it out live here: https://meetmeonthebus.herokuapp.com

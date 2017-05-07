var express = require('express');
var router = express.Router();
var passport = require('passport');
var nodemailer = require('nodemailer');
var MAIL_PASS = require('../modules/mailPass');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'meetmemailer@gmail.com',
        pass: process.env.MAIL_PASS || MAIL_PASS
    }
});

router.post('/', function(req, res) {
  var mailer = req.body;

  var mailOptions = {
    from: '"Meet Me Mailer", meetmemailer@gmail.com',
    to: mailer.toEmail, // list of receivers
    subject: mailer.subject, // subject line
    text: mailer.message, // plain text body
    html: '<b>' + mailer.message + '</b>' // html body
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  res.sendStatus(200);
});

module.exports = router;

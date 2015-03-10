var express = require('express');
var router = express.Router();
var	passport = require('passport');
var form = require("../form/user");
var UserManagement = require('user-management');

/* GET login page. */
router.get('', function(req, res, next) {
  res.render('sign');
});

router.post('',
	passport.authenticate('local', {
		sucessRedirect: '/',
		failureRedirect: '.',
		failureFlash: true
	})
);

router.get('/new', function(req, res) {
	res.render('sign/new', {form: form.UserForms.toHTML()});
});

router.post('/new', function(req, res, form) {
	var data = req.body;
	var USERNAME = data.username;
	var PASSWORD = data.password;
	var EXTRAS = {
		email: data.email
	};

	var users = new UserManagement();
	users.load(function(err) {
	  console.log('Checking if the user exists');
	  users.userExists(USERNAME, function(err, exists) {
	    if (exists) {
	      console.log('  User already exists');
	      users.close();
	      res.redirect('./new');
	    } else {
	      console.log('  User does not exist');
	      console.log('Creating the user');
	      users.createUser(USERNAME, PASSWORD, EXTRAS, function (err) {
	        console.log('  User created');
	        users.close();
	        res.redirect('.');
	      });
	    }
	  });
	});
});

module.exports = router;
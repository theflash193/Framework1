var express = require('express');
var router = express.Router();
var form = require("../form/user");
var UserManagement = require('user-management');
var easymongo = require('easymongo');


/* function define */
function create(req, res)
{
	res.render('admin/create', {
		form : form.UserForms.toHTML()}
		);
}

function read(req, res)
{
	var mongo = new easymongo('mongodb://localhost/user_management');
	var users = mongo.collection('users');

	users.find(function(err, result) {
		if (err) return (err);
		res.render('admin/read', {users : result});
	})
}

function update(req, res)
{
	res.render('admin/update');
}

function delete_id(req, res)
{
console.log(UserManagement);
	var user = new UserManagement();
	var username = req.params.name;

	console.log(user);
	user.load(function(err) {
		if (err) {user.close(); return (err);}
		// chargement de la db
		user.userExists(username, function(err, exists) {
			if (err) {user.close; return (err);}
			if (!exists) {user.close; return (err);}
			// on verifie que le user existe 
			user.removeUser(username, function(err) {
				if (err) {user.close(); return (err);}
				console.log('suppression du user');
				user.close();
				res.redirect('/');
			});
		});
	});

}

/* GET admin page */
router.get('/', read);
router.get('/create/', create);
router.get('/update', update);
router.get('/delete/user/:name', delete_id);

router.post('/create', function(req, res) {
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
})

module.exports = router;
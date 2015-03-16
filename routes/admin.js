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
	var options = {
		sort: {
			username: 1
		}
	}

	users.find({}, {sort: {username: 1}}, function(err, result) {
		console.log(err);
		if (err) {mongo.close();return (err);}
		mongo.close();
		res.render('admin/read', {users : result});
	});
}

function edit(req, res)
{
	var id = req.params.id;
	var db = new easymongo('mongodb://localhost/user_management');
	var collection = db.collection('users');

	collection.findById(req.params.id , function(err, result) {
		if (err) {db.close(); return (err);}
			var formEdit = form.UserForms.bind(result);
			db.close();
			res.render('admin/update', {form: formEdit.toHTML()});
	});
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
				res.redirect('/admin');
			});
		});
	});

}

/* GET admin page */
router.get('/', read);
router.get('/create/', create);
router.get('/edit/:id', edit);
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
});

router.post('/edit/:id', function(req, res) {
	var db = new easymongo('mongodb://localhost/user_management');
	var collection = db.collection('users');
	var user = new UserManagement();
	var id = req.params.id;
	var tmp = req.body;

	collection.findById(id, function(err, result) {
		console.log('chargement du user');
		if (err) { db.close(); return (err);}
		var USERNAME = result.username;
		user.load(function(err) {
			console.log('chargement de la db');
			if (err) { db.close(); user.close(); return (err);}
			user.removeUser(result.username, function(err) {
				if (err) { db.close(); user.close(); return (err);}
				console.log('suppression de l\'utilisateur ');
			});
			user.createUser(USERNAME, tmp.password, {email: tmp.email}, function(err) {
				if (err) { db.close(); user.close(); return (err);}
				db.close();
				user.close();
				console.log('creation de l\'utilisateur');
				res.redirect('/admin');
			});
		});
	});
});

module.exports = router;
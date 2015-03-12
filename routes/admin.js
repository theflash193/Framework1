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
		console.log(result);
		res.render('admin/read', {users : result});
	})
}

function update(req, res)
{
	res.render('admin/update');
}

function deletead(req, res)
{
	res.render('admin/delete');
}

/* GET admin page */
router.get('/', function(req, res) {
	res.render('admin/admin');
});

router.get('/create', create);
router.get('/read', read);
router.get('/update', update);
router.get('/delete', deletead);

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
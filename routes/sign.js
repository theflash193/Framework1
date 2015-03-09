var express = require('express');
var router = express.Router();
var	passport = require('passport');
var form = require("../form/user");

/* GET login page. */
router.get('', function(req, res, next) {
  res.render('sign');
});

router.get('/new', function(req, res) {
	res.render('sign/new', {form: form.UserForms.toHTML()});
})

router.post('/new',
	passport.authenticate('local', {successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true}
	));

module.exports = router;
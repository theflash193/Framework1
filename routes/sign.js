var express = require('express');
var router = express.Router();
var	passport = require('passport');

/* GET login page. */
router.get('', function(req, res, next) {
  res.render('sign');
});

router.post('sign',
	passport.authenticate('local', {successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true}
	));

module.exports = router;
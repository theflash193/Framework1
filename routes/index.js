var express = require('express');
var passport = require('passport');
var router = express.Router();

// function
function ensureAuthenticated(req, res, next)
{
	if (req.isAuthenticated())
		next();
	else
		res.send(403);
}

/* GET home page. */
router.get('/', function(req, res, next)
{
	res.render('index',
	{
  		isAuthenticated : req.isAuthenticated(),
  		user : req.user
  	});
});

router.get('/login', function(req, res)
{
	res.render('login');
	console.log('jojo');
});

router.post('/login', passport.authenticate('local',
	{
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})
);

router.get('/logout', function(req, res)
{
	req.logout();
	res.redirect('/');
});



router.get('/api/data', ensureAuthenticated, function(req, res)
{
	res.json([
		{ value: 'foo'},
		{ value: 'bar'},
		{ value: 'baz'}
		]);
});

// router.post('/login', passport.authenticate('local',
// 	{
// 		successRedirect: '/',
// 		failureRedirect: '/login',
// 		failureFlash: true
// 	})
// );
module.exports = router;

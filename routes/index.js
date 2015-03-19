var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
	var sess;

	if (req.isAuthenticated() === false)
		res.redirect('/sign');
	role = req.session.role;
	console.log("role: %s", role);
	res.render('index', {Role: role});
});

module.exports = router;

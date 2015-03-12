var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.isAuthenticated() === false)
		res.redirect('/sign');
	res.render('index');
});

module.exports = router;

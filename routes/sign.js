var express = require('express');
var router = express.Router();

/* GET sign page */
router.get('/', function(req, res, next) {
	res.render('sign');
});

module.exports = router;
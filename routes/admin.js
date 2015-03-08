var express = require('express');
var router = express.Router();

/* GET admin page */
router.get('/admin', function(req, res) {
	res.render('admin/admin');
});

module.exports = router;
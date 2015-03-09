var express = require('express');
var router = express.Router();
var form = require("../form/user");

/* function define */
function create(req, res)
{
	console.log(UserForms);
	res.render('admin/create', {
		form : form.UserForms.toHTML()}
		);
}

function read(req, res)
{
	res.render('admin/read');
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
module.exports = router;
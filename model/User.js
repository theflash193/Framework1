var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	id: ObjectId,
	username: String,
	password: String,
	email: String,
});

module.exports = UserSchema;
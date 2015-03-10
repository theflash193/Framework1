var mangoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	id: ObjectId;
	username: String;
	password: password;
	email: email;
});

module.exports = UserSchema;
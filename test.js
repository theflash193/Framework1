var mongoose = require('mongoose');

mongoose.connect('localhost', 'gettingstarted');

var Schema = mongoose.Schema;

// var BlogSchema = new Schema({
// 	title: String,
// 	author: String,
// 	body: String,
// 	comments: [{ body: String, date: Date}],
// 	date: { type: Date, default: Date.now },
// 	hidden: Boolean,
// 	meta: {
// 		votes: Number,
// 		favs: Number
// 	}
// });

// var Blog = mongoose.model('Blog', BlogSchema);
var TankSchema = new Schema({
	size: String
});
var Tank = mongoose.model('Tank', TankSchema);
// var small = new Tank({size: 'small'});

// small.save(function (err) {
// 	if (err) return handleError(err);
// })

Tank.create({size: 'small'}, function (err, small) {
	if (err) return handleError(err);
})

Tank.create({size: 'jojo'}, function (err, jojo) {
	if (err) return handleError(err);
})

// Tank.findOne({'size': 'small'}, function (err, Tank){
// 	if (err) return handleError(err);
// 	console.log('Tank size : %s', Tank.size);
// })

// Tank.findOne({'size': 'jojo'}, function (err, Tank){
// 	if (err) return handleError(err);
// 	console.log('Tank size : %s', Tank.size);
// })

// Tank.remove({size: 'jojo'}, function (err, jojo) {
// 	if (err) return handleError(err);
// 	console.log('suppression\n');
// })

// Tank.findOne({'size': 'jojo'}, function (err, Tank){
// 	if (err) return handleError(err);
// 	console.log('Tank size : %s\n', Tank.size);
// })

Tank.remove({'size'})
Tank.find(function (err, Tanks) {
	if (err) return handleError;
	console.log(Tanks);
})
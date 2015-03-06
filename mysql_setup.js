// Step-1
var mysql = require('mysql');

// Step-2
var option = {
	host : "localhost",
	user : "root",
	password : "maxgord77",
	database : "jojo"
};
var conn = mysql.createConnection(option);

// Step-3
// function test (error, results) {
// 	if (error)
// 		throw error;
// 	else
// 		console.log(results);
// }
conn.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

// var queryString = "Select = from users";
// conn.query(queryString, function(error, results) {
// 	if (err)
// 		throw err;
// 	else
// 		console.log(results);
// });

// conn.end;
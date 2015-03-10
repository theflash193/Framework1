var UserManagement = require('user-management');
var users = new UserManagement();

exports.VerifyCredentials = function (USERNAME, PASSWORD, done)
{
	users.load(function(err) {
		users.authenticateUser(USERNAME, PASSWORD, function(err, result)
		{
			if (!result.userExists)
			{
				users.close();
				done(null, false, {message : 'Invalid Username'});
				
			}	
			else if (!result.passwordsMatch)
			{
				users.close();
				done(null, false, {message : 'Invalid Password'});
			}	
			else
			{
				users.close();
				User.findOne({username: USERNAME}, function (err, user) {
					done(null, user);
				})
			}
		})
	});
}
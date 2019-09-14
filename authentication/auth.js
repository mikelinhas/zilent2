var mongo = require('../database/mongo');
var passwordHash = require('password-hash');
const LocalStrategy = require('passport-local').Strategy;




exports.strategy = new LocalStrategy(
	function (username, password, done) {
		//console.log(' ')
		//console.log('--- Inside local strategy callback ---')

		if (username) {
			let user = username.toLowerCase()
			mongo.findUser(user, function(err, result){
				if (err) {
					console.log("mongo error")
					console.log(err)
					done(null, false)
				}

				if (result) {
					//console.log("User was found!")
					//console.log(result)

					if (passwordHash.verify(password, result.password)) {
						//console.log("Password was authenticated!")
				    	//console.log('Local strategy returned true')
				    	//console.log(' ')
			 			let user = {id: result._id, username: result.user}
						done(null, user)
					} else {
						done(null, false)
					}
				} else {
					done(null, false)
				}
			})
		}
	}
);

exports.authenticated = function (req, res, next) {
	//console.log(' ')
	//console.log('--- Checking authentication ---')
	//console.log('User authenticated? - ' + req.isAuthenticated())
	//console.log('User session info')
	//console.log(req.user)
	if(req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/login')
	}		
}


exports.serialize = function(user,done) {
	//console.log(' ')
	//console.log('--- Inside serializeUser callback ---')
	//console.log('User id is saved to the session file store here')
	//console.log(' ')
	done(null, user.id);
}


exports.deserialize = function(id,done) {
	//console.log(' ')
	//console.log('--- Inside deserializeUser callback ---')
	//console.log('The user id passport saved in the session file store is: ' + id)
	mongo.findUserById(id, function(err, result) {
		if (err) {
			console.log(err)
			done(null, false)
		} else {
			let user = {id: result._id, username: result.user}
			done(null, user);
		}
	})
}
//Routing files
var views = require('./views');
var auction = require('../database/auction');
var auth = require('../authentication/auth');


module.exports = exports = function(app, db, passport) {

	const authenticated = auth.authenticated

	/** VIEWS */
	
	app.get('/', authenticated, views.auction);
	app.get('/lite', authenticated, views.liteauction);
	
	// LOGIN STUFF
	app.post('/login', (req, res, next) => {

		passport.authenticate('local', (err, user, info) => {
			console.log(' ')
			console.log('--- Inside passport.authenticate() callback ---');
			console.log('user: ' +  user)
			console.log('req.session.passport: ' + JSON.stringify(req.session.passport))
			console.log('req.user: ' + JSON.stringify(req.user))
			console.log(' ')

			req.login(user, (err) => {
				console.log(' ')
				console.log('--- Inside req.login() callback ---')
				console.log('req.session.passport: ' + JSON.stringify(req.session.passport))
				console.log('req.user: ' + JSON.stringify(req.user))
				console.log('authenticated and logged in')
				console.log(' ')
				return res.redirect('/');
			})

		})(req, res, next);
	})

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/login');
	});


	// VIEWS
	app.get('/login', views.login);


	// DATABASE AUCTION QUERYS
	app.get('/db/queryItems', authenticated, auction.getItems);


	// DATABASE BID QUERYS
	app.post('/db/addBid', authenticated, auction.addBid);


}
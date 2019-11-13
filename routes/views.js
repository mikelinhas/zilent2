/*
 * RENDER views.
 */

require('dotenv').config();

var DEADLINE = process.env.DEADLINE

exports.auction = function(req, res) {
	var username = req.user.username
	var user = username.charAt(0).toUpperCase() + username.slice(1);
    res.render('views/auction', {
    	user: user,
    	deadline: DEADLINE
    });
};

exports.liteauction = function(req, res) {
	var username = req.user.username
	var user = username.charAt(0).toUpperCase() + username.slice(1);
    res.render('views/auction-lite', {
    	user: user,
    	deadline: DEADLINE
    });
};

exports.login = function(req, res) {
	console.log(' ')
	console.log('session is: ' + req.sessionID)
	console.log(' ')
    res.render('views/login');
};

/*
 * RENDER views.
 */

exports.auction = function(req, res) {
	var username = req.user.username
	var user = username.charAt(0).toUpperCase() + username.slice(1);
    res.render('views/auction', {
    	user: user
    });
};

exports.login = function(req, res) {
	console.log(' ')
	console.log('session is: ' + req.sessionID)
	console.log(' ')
    res.render('views/login');
};

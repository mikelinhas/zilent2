const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

if (process.env.NODE_ENV === 'development') {
    var DB_URL = process.env.DB_URL_DEV
}

if (process.env.NODE_ENV === 'production') {
    var DB_URL = process.env.DB_URL_PROD
}

exports.MongoStoreConfig = new MongoStore({ 
	url: DB_URL,
	ttl: 60 * 60 * 24 * 10, // 10 days
	ttl: 30,
	autoRemove: 'interval',     
	autoRemoveInterval: 60  * 42 // 1 day
});

exports.generateID = function(req) {
    //console.log('  ')
    //console.log('Inside session middleware genid function')
    //console.log('Request object sessionID from client: ' + req.sessionID)
    id = uuid();
    //console.log('Generated id: ' +  id)
    //console.log('  ')
	return id // use UUIDs for session IDs
};

exports.cookieConfig = { 
	expires: new Date(Date.now() + 3600000 * 24 * 100), // now + 10 days
	maxAge: 3600000 * 24 * 10 // 10 days
}
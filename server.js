/**
 * Module dependencies
 */

//Express
const express = require('express');
const app = express();
const port = 5000

// other Dependencies
const path = require('path');
const fs = require('fs');


// Define Routes and Database middleware
const routes = require('./routes');
const mongodb = require('./database/mongo');
const auth = require('./authentication/auth');
const sessions = require('./sessions/sessions');
//const logging = require('./logging/logs');

//Middleware
const uuid = require('uuid/v4')
const favicon = require('serve-favicon');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');


/**
 * Configuration
 */

// App (Express) environment
app.set('port', process.env.PORT || port);
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));


/**
 * Environment configuration
 */

require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}



/**
 * Session Management
 */

const sessionStore = sessions.MongoStoreConfig 
const genidMiddleware = sessions.GenerateId
const cookieConfig = sessions.cookieConfig

app.use(session({
	genid: genidMiddleware,
    store: sessionStore,
    cookie: cookieConfig,
	resave: false,
	saveUninitialized: true,
	secret: 'uwotm8' 
}));



/**
 * Authentications
 */

passport.use(auth.strategy);
passport.serializeUser(auth.serialize);
passport.deserializeUser(auth.deserialize);

app.use(passport.initialize());
app.use(passport.session());



/**
 * Connect to MongoDB and start server
 */

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")
		
		// Routes
		routes(app, db, passport);
		
		app.listen(app.get('port'), function() {
		    console.log('Express server listening on port ' + app.get('port'));
		});

	}
});

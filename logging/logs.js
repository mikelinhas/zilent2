var winston = require('winston');
require('winston-mongodb');

if (process.env.NODE_ENV === 'development') {
    var DB_URL = process.env.DB_URL_DEV
}

if (process.env.NODE_ENV === 'production') {
    var DB_URL = process.env.DB_URL_PROD
}

const customLevels = { 
  error: 0, 
  info: 1, 
  warn: 2
}


const logger = winston.createLogger({
	levels: customLevels,
    transports: [
	    new winston.transports.MongoDB({
	        db : DB_URL,
	        collection : 'serverLogs',
	        level: 'info'
	    }),
	    new winston.transports.MongoDB({
	        db : DB_URL,
	        collection : 'serverLogs',
	        level: 'warn'
	    }),
	    new winston.transports.MongoDB({
	        db : DB_URL,
	        collection : 'serverLogs',
	        level: 'error'
	    })	    
    ]
});

exports.infoLog = function (message) {

}

exports.warningLog = function (message) {
	logger.warn("message")
}

exports.errorLog = function (error) {
	logger.error(error)
}
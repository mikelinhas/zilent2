const mongo = require('mongodb');
const mongodb = require('../database/mongo');
const fs = require("fs");
const passwordHash = require('password-hash');

var hashed_password = passwordHash.generate('123');

var users = [
				{"_id": "1", "user": "ree", "nickname": "Mrs. Ree", "password": hashed_password},
				{"_id": "2", "user": "neil", "nickname": "NeilCo", "password": hashed_password},
				{"_id": "3", "user": "random", "nickname": "Bruce", "password": hashed_password},
				{"_id": "4", "user": "damia", "nickname": "Damia!", "password": hashed_password},
				{"_id": "5", "user": "carlos", "nickname": "Carlooos", "password": hashed_password},
		    ]

//For protection purposes
//process.exit()

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")


		mongodb.insertUsersFromScript(users, function (err, result) {
	    	if (err) {
	    		console.log (err);
	    		res.status(500).send({});
	    	} else {
	    		console.log ("users were added to DB");
	    		process.exit()
	    	}
	    });	
	}
});
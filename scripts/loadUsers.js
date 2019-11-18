const mongo = require('mongodb');
const mongodb = require('../database/mongo');
const fs = require("fs");
const passwordHash = require('password-hash');

var hashed_password = passwordHash.generate('123');

let users_file = fs.readFileSync("scripts/users.json");
let users = JSON.parse(users_file);

let hashed_users = users.map(function(user){
	let hashed_user = {"_id": user._id, "user": user.user.toLowerCase(), "password": passwordHash.generate(user.password), "favorites": []}
	return hashed_user
})



//For protection purposes
//process.exit()

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")


		mongodb.insertUsersFromScript(hashed_users, function (err, result) {
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
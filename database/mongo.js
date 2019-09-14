var mongo  = require("mongodb");
var MongoClient = mongo.MongoClient;
require('dotenv').config();
var db;

if (process.env.NODE_ENV === 'development') {
    console.log("Using local DB")
    var DB_URL = process.env.DB_URL_DEV
}

if (process.env.NODE_ENV === 'production') {
    console.log("\x1b[33m", "Caution: Using production DB", "\x1b[30m")
    var DB_URL = process.env.DB_URL_PROD
}

// CONNECTION to DATABASE
    exports.init = function(cb){
            //db.open(cb);
            console.log("connecting to MongoDB...");
            MongoClient.connect(DB_URL, 
                function(err, dbinstance) {
                    if (err){
                        //log(err);
                        cb(err,0);
                    } else {
                        db = dbinstance;
                        cb(0,dbinstance);
                    }
            });
    };

/** 
 * AUTHENTICATION 
 */

exports.findUser = function(username, cb){
    db.collection("users", function(err, collection) {
        collection.findOne({"user": username}, cb)
    })
};

exports.findUserById = function(id, cb){
    db.collection("users", function(err, collection) {
        collection.findOne({"_id": id}, cb)
    })
};

// INSERT: Inserts users coming from the script function
exports.insertUsersFromScript = function(data, cb){
    db.collection("users", function(err, collection) {
        collection.insert(data, cb)
    })
}

// Generic
    exports.findAll = function(collectionName, cb){
        db.collection(collectionName, function(err, collection) {
            collection.aggregate([
                {$unwind: "$bids"},
                {$sort: { "_id": 1, "bids.amount": -1}},
                {$group: { 
                    "_id": "$_id",
                    "name": { "$first": "$name"},
                    "artist": { "$first": "$artist"},
                    "image": { "$first": "$image"},
                    "bids": {"$push": "$bids"}
                }}
            ]).toArray(cb);
        });
    };

    exports.findByName = function(collectionName, name, cb){
        db.collection(collectionName, function(err, collection) {
            collection.aggregate([
                {$match: {'name': name}},
                {$unwind: "$bids"},
                {$sort: { "_id": 1, "bids.amount": -1}},
                {$group: { 
                    "_id": "$_id",
                    "name": { "$first": "$name"},
                    "artist": { "$first": "$artist"},
                    "bids": {"$push": "$bids"}
                }}
            ]).toArray(cb);
        });
    };

    exports.findByUser = function(collectionName, user, cb){
        db.collection(collectionName, function(err, collection) {
            collection.findOne({'user': user}, cb );
        });
    };

    exports.findUserByID = function(collectionName, id, cb){
        db.collection(collectionName, function(err, collection) {
            collection.findOne({'_id': id}, cb );
        });
    };

// Updates
    exports.updateBids = function(collectionName, name, bid, cb){  //same as insert

        db.collection(collectionName, function(err, collection) {
            collection.update({'name': name }, { $addToSet: {"bids": bid}}, {safe:true}, cb);
        });

    };


//old?
    exports.insert = function(collectionName, documents, cb){
        db.collection(collectionName, function(err, collection) {
            collection.insert(documents, cb)
        });
    }

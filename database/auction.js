var mongodb = require('./mongo')
var auctionCollection = "auction"
var userCollection = "users"

var deadline = new Date("2019-10-22T23:15:03Z");
// Note: must be one hour less than in Spain

var winston = require('winston');

const customLevels = { 
  error: 0, 
  info: 1, 
  warn: 2
}

var timestamp = function (date) {
	hour = doubledigit(date.getHours());
	mins = doubledigit(date.getMinutes());
	secs = doubledigit(date.getSeconds());
	return "[" + hour + ":" + mins + ":" + secs + "] - "
}

var doubledigit = function (value) {
	if(value.toString().length <= 1) {
        return "0"+value.toString();
    }
    return value.toString();
}


const logger = winston.createLogger({
	levels: customLevels,
    transports: [
	    new winston.transports.File({
	      filename: 'bids.log',
	      level: 'info'
	    }),
	    new winston.transports.File({
	      filename: 'errors.log',
	      level: 'warn'
	    })
    ]
});



// GET
	
	exports.getItems = function (req,res) {
		mongodb.findAll(auctionCollection, function (err,result) {
			if (err){
				logger.warn(timestamp(new Date) + "Can't query items")
				// DEBUG : console.log(err);
				res.status(500).send({});
			} else {
				res.status(200).send(result);
			}
		});
	}

	// This function is way too messy... in the future should clean it up a bit
	exports.addBid = function (req,res) {

		var username = req.user.username
		var user = username.charAt(0).toUpperCase() + username.slice(1);
		var amount = +req.body.amount;
		if (isNaN(amount)) { amount = 0 }
		var date = new Date();
		var name = req.body.name;
		var item_id = req.body.id;
		console.log(item_id);

		var bid = {"date": date, "bidder": user, "amount": amount};

		var error = [
			{"type": 0},
			{"type": 1, "message": "Demasiado tarde, la subasta ha acabado"},
			{"type": 2, "message": "Cantidad insuficiente"}
		];


		//0 - Check if auction is still on
		if (date > deadline) {

			// DEBUG : console.log("bidding is over");
			res.status(500).send(error[1]);

		} else {
	    
			//CHECK IF BID IS BIGGER THAN CURRENTBID
			mongodb.findByName(auctionCollection, name, function (err,result) {

				var currentAmount = +result[0].bids[0].amount;

				//CHECK IF AMOUNT IS LARGER THAN CURRENT AMOUNT
				if (amount > currentAmount + 19.99) {

					//PUSH BID TO BIDS ARRAY
					mongodb.updateBids(auctionCollection, name, bid, function (err,result) {
						if (err) {
							res.status(500).send({});
						} else {
							res.status(200).send(bid);	
							logger.info(timestamp(new Date) + bid.bidder + " : " + bid.amount + "€ - " + item_id);
						}
					})

				} else {
					logger.warn(timestamp(new Date) + user + " : Puja insuficiente - " + item_id);
					// DEBUG : console.log("amount is insufficient");
					error[2].currentBid = result[0].bids[0].amount;
					res.status(500).send(error[2]);
				}

			})
		}	  

	}



	exports.getOneproduct = function (req,res) {
		var id = req.query.id;
		console.log(id);
		mongodb.findById(auctionCollection, id, function (err,result) {
			if (err){
				console.log(err);
				res.status(500).send({});
			} else {
				res.status(200).send(result);
			}
		});
	}


// POST

exports.addproducts = function(req, res) {

	console.log(req);

    mongodb.create('articles', article, function (err, result) {
    	if (err) {
    		console.log (err);
    		res.status(500).send({});
    	} else {
    		var _id = result[0]._id;
    		console.log ("article was added to mongodb.. check it out");
    	}
    });

};


// DELETE

exports.delete = function (req, res) {
	console.log (req.body);
	var id = req.body.id;
	mongodb.delete ("articles", id, function (err,result) {
		if (err){
			console.log(err);
    		res.status(500).send({});
		} else {
			console.log(id + "was deleted from the mongoDB");
    		res.status(200).send({});
		}
	});
};

var mongo = require('mongodb');
var mongodb = require('../database/mongo');

var items = 
[
	{"_id":"Ajenjo",
	"artist":"Mónica Ajenjo",
	"name":"Lazo multicolor en verdes y tierras",
	"image":"Ajenjo",
	"bids": [{"bidder": "","amount": 200}]
	},

	{"_id":"Arrue",
	"artist":"Jesús Arrué",
	"name":"Aisha",
	"image":"Arrue",
	"bids": [{"bidder": "","amount": 500}]
	},

	{"_id":"Calo",
	"artist":"Calo Carratalá",
	"name":"Río Nanay y Palafito",
	"image":"Calo",
	"bids": [{"bidder": "","amount": 750}]
	},

	{"_id":"Paz",
	"artist":"Paz Ferrer Martínez",
	"name":"We can't help everyone, but everyone can help someone",
	"image":"Paz",
	"bids": [{"bidder": "","amount": 150}]
	},

	{"_id":"Artur",
	"artist":"Artur Heras",
	"name":"Hotel Ambos Mundos",
	"image":"Artur",
	"bids": [{"bidder": "","amount": 300}]
	},

	{"_id":"Marti",
	"artist":"Jorge Martí",
	"name":"Menina in blue",
	"image":"Marti",
	"bids": [{"bidder": "","amount": 150}]
	},

	{"_id":"Michavila",
	"artist":"Carmen Michavila",
	"name":"S/T",
	"image":"Michavila",
	"bids": [{"bidder": "","amount": 400}]
	},

	{"_id":"Unsain",
	"artist":"Tere Unsain - Personalizado",
	"name":"Retrato personalizado a lápiz",
	"image":"Unsain",
	"bids": [{"bidder": "","amount": 650}]
	},

	{"_id":"Quintana",
	"artist":"Ángel Luis Quintana",
	"name":"Concierto Violoncello Privado",
	"image":"Quintana",
	"bids": [{"bidder": "","amount": 200}]
	},

	{"_id":"Prado",
	"artist":"Museo del Prado",
	"name":"Concierto en el museo",
	"image":"Prado",
	"bids": [{"bidder": "","amount": 100}]
	},

	{"_id":"Lara",
	"artist":"José Manuel Lara",
	"name":"Palos de golf firmados",
	"image":"Lara",
	"bids": [{"bidder": "","amount": 100}]
	},

	{"_id":"Basket",
	"artist":"Valencia Basket Femenino",
	"name":"Camiseta firmada por las jugadoras",
	"image":"Basket",
	"bids": [{"bidder": "","amount": 100}]
	},


	{"_id":"ATMadrid",
	"artist":"AT Madrid",
	"name":"Camiseta ATM firmada por los jugadores",
	"image":"ATMadrid",
	"bids": [{"bidder": "","amount": 100}]
	},

	{"_id":"Levante",
	"artist":"Levante UD",
	"name":"Balón firmado por los jugadores",
	"image":"Levante",
	"bids": [{"bidder": "","amount": 100}]
	},

	{"_id":"Valencia",
	"artist":"Valencia CF",
	"name":"Camiseta VCF firmada por los jugadores",
	"image":"Valencia",
	"bids": [{"bidder": "","amount": 100}]
	}

]

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log("Connected to MongoDB! Yay!")

	    mongodb.insert('auction', items, function (err, result) {
	    	if (err) {
	    		console.log (err);
	    		res.status(500).send({});
	    	} else {
	    		console.log(result);
	    		console.log ("items were added to auction collection.. check them out");
	    	}
	    });		
	}
});




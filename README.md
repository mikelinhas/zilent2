# zilent2
### Second version of the *silent auction* app
The silent auction allows users to bid on the listed items on their phones. It is currently a single-page application.


### Important mongo querys for administrator

Remove last bid from item

`db.auction.update( { _id: "Unsain" }, { $pop: { bids: 1 } } )`


Add bid to item

`db.auction.update( { _id: "Unsain" }, { $push: { bids: {"bidder": "","amount": 2000} } } )`

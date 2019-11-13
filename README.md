# zilent2
##Second version of the silent auction

Important mongo querys for management

Remove last bid from item
    db.auction.update( { _id: "Unsain" }, { $pop: { bids: 1 } } )


Add bid to item
    db.auction.update( { _id: "Unsain" }, { $push: { bids: {"bidder": "","amount": 2000} } } )

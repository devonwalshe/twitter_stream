// An attempt at building a query to get the set intersection of the different databases but needs work in the future.  

var client = require('mongodb').MongoClient, format = require('util').format;

client.connect("mongodb://localhost:27017/twitterstream", function(err, db){
  if (err) throw err;
  
  console.log("connected");
  
  
  // console.log(house)
  // collection.find().toArray()
  
  
});


// An attempt at building a query to get the set intersection of the different databases but needs work in the future. 

var client = require('mongodb').MongoClient, format = require('util').format;

client.connect("mongodb://localhost:27017/twitterstream", function(err, db){
  if (err) throw err;
  
  console.log("connected");
  
  var house = db.collection('house').find().toArray(function(err, list){});
  var tree = db.collection('tree').find().toArray(function(err, list){});
  
  // console.log(house)
  // collection.find().toArray()
  
  
});


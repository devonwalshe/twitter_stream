// Requirements
var twit = require('twit')
var argv = require('yargs')
           .usage('Usage: $0 --keywords="twitter stream, tree house,[...]" --geobox=us_canada|asia|europe|uk_ireland|glasgow')
           .argv;
           
var mongo = require('mongodb');
var credentials = require('./credentials.js');
var locations = require('./locations.js');
var keywords = require('./keywords.js')

// Set geobox manually to glasgow
geobox = locations.glasgow;

var key_array = keywords.split(",");

// Argument parsing - Unused. 
// if (argv.keywords){
//   keywords = argv.keywords
// };
//
// if (argv.geobox){
//   var location = argv.geobox
//   var geobox = locations[location]
// };

// Twitter init
var t = new twit({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token: credentials.access_token,
    access_token_secret: credentials.access_token_secret
});

// Database Server init
var Server = mongo.Server,
    Db = mongo.Db,
    assert = require('assert')
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('twitterstream', server);

db.open(function(err, db){

  assert.equal(null, err);
  
  // Set up the right stream parameters
  // if (typeof geobox != 'undefined' && typeof keywords != 'undefined' ){
  //
  //   var stream = t.stream('statuses/filter', {locations: geobox, track:keywords})
  //
  // } else if (typeof geobox != 'undefined'){
  //
  //   var stream = t.stream('statuses/filter', {locations: geobox})
  //
  // } else if (typeof keywords != 'undefined'){
  //
  //   var stream = t.stream('statuses/filter', {track: keywords})
  //
  // };
    
  var stream = t.stream('statuses/filter', {track: keywords, locations:geobox})
  stream.on('tweet', function (tweet) {

    // Loop through keywords and check if they are in the tweet text
    for (i=0; i < key_array.length; i++){
      var keyword = key_array[i];

      if (tweet['text'].toLowerCase().indexOf(keyword) >= 0){
        
        //Add them to an array inside the object with an id of the name of the collection
        collection = db.collection("tweets")

        collection.insert({keyword:keyword, tweet:tweet});
        console.log(tweet);

        
      };
    };

  });
  // db.close();
});

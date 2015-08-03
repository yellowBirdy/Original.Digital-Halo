var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , express = require('express')
  , bodyParser = require('body-parser')
  , MongoClient = require('mongodb').MongoClient
  , childProcess = require('child_process')
  , assert = require('assert')
  , website = require('./website')

var pds = express()

var website = website(pds, express, MongoClient)

var userId = 1
  , mongoUrl = 'mongodb://localhost:27017/dummy-pds';


// Route handlers  

function handleData (req, res) {
    MongoClient.connect(mongoUrl, function (err, db) {
	if (err) return console.log ("can't connect to Mongo: "+err)
	console.log("Connected to mongo");
        insertToMongo(db, {userID: userId, url: req.body.sentUrl}, function () {
            db.close()   
	})
    });
    res.send('<h1>url saved<h1>');
}

function insertToMongo (db, data, callback)  {
    var collection = db.collection('url');
    collection.insert(
      data, 
      function (err, result) {
          if (err) return console.log('Unable to insert to mongo: '+ err)
          console.log('Inserted sent url: '+ data.url);
	  callback(result)
      });
}

function computeTopic (callback) {
    var python = childProcess.exec('python ../analysis/compute_halo.py', function (err) {  
        if (err) return console.log(err)  });
    python.on('exit', function (code) {
       console.log('child python process: compute_halo finished with response: '+code);
       callback();
    });
}

function readFromMongo (db, data, callback)  {
    var collection = db.collection('topic');
    collection.find(data, {topic:1, count:1, _id:0}, {sort: '-count'}).toArray( function (err, result)  {
           if (err) return console.log ("can't read from Mongo: "+ err)
           console.log("read succesful for: "+data.userID);
           callback(result)    
       }
    )
}

function sendHalo (req, res)  {
    computeTopic(function ( ) {
      MongoClient.connect(mongoUrl, function (err,db) {
          if (err) return console.log ("can't connect to Mongo: "+ err)
          console.log("Conencted to mongo");
          readFromMongo (db, {userID: userId}, function (result) {
//            res.header('Content-Type', 'application/json');
              res.send(result)
              db.close()   
          })
      })
    })
}

function showHalo (req, res)  {
    computeTopic(function ()  {
      MongoClient.connect(mongoUrl, function (err, db) {	
	if (err) return console.log("Couldn't conn to Mongo while getting halo"+ err)  
	readFromMongo (db, {userID: userId}, function (result) {
//          res.type('html');
          result.map(function (el, i)  { el.topic = el.topic.split('/').slice(2,4).join('/'); return el})
          website(res, result); 
	});
      });
    });
}  

// Register Middleware

pds.use(bodyParser.json());


// Routing
//
pds.post("/", handleData)
pds.get("/", sendHalo);
pds.get("/showHalo", showHalo)
//pds.get("/showHalo", website)

pds.listen(8000)
console.log('Listening on localhost port 8000')

var mongoose = require('mongoose')

var schema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
, topic : String
, count : Number  
},{
  collection: 'topic'    
})

var Model  = mongoose.model('topic',  schema)

module.exports = Model

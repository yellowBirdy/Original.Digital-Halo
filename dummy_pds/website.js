const stylus = require('stylus')
    , nib = require('nib')

    
 module.exports = function (app, express, MongoClient)  {

  // helper function  for stylus
  function compile (str, path)  {
    return stylus(str)
      .set('filename', path)
      .use(nib())
  }
  app.set('views',  __dirname + '/data/views')
  app.set('view engine', 'jade')
  app.use(stylus.middleware(
    { src: __dirname + '/public/stylesheets',	    
        compile: compile
    }      
  ))
  app.use(express.static(__dirname + '/public'))
 

 /////////
  return  function  (res, topics)  {

      res.render('index',
                 {title: 'See your Halo',
      	          topics:  topics
                 }
      )
  }
}

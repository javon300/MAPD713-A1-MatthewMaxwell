var SERVER_NAME = 'user-api'
var PORT = 8000;
var HOST = '127.0.0.1';


var restify = require('restify')

  // Get a persistence engine for the images
  , imagesSave = require('save')('images')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /images')
  console.log(' /images/:id')  
})

server
  // Allow the use of POST
  .use(restify.fullResponse())
  .use(restify.bodyParser())
server.get('/images', function (req, res, next) {
  Save.find({}, function (error, images) {
    res.send(images)
  })
})

// Get a single user by their user id
server.get('/image/:id', function (req, res, next) {

  // Find a single user by their id within save
  imagesSave.findOne({ _id: req.params.id }, function (error, images) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (image) {
      // Send the user if no issues
      res.send(image)
    } else {
      // Send 404 header if the user doesn't exist
      res.send(404)
    }
  })
})

 
// Create a new user
server.post('/images', function (req, res, next) {
  // if (req.params.name === undefined ) {
  //   return next(new restify.InvalidArgumentError(''))
  // }
  // if (req.params.id === undefined ) {
  //   return next(new restify.InvalidArgumentError('age must be supplied'))
  // }   
  //  if (req.params.url === undefined ) {   
  //   return next(new restify.InvalidArgumentError(''))
  // }
  // if (req.params.size === undefined ) {    
  //   return next(new restify.InvalidArgumentError('age must be supplied'))
  // }
  var newImage = {
		name: req.params.name, 
		id: req.params.id,
    url: req.params.url, 
		size: req.params.size
	}
  imagesSave.create( newImage, function (error, image) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    res.send(201, image)
  })
})

// Update a user by their id
server.put('/users/:id', function (req, res, next) {

  // Make sure name is defined
  if (req.params.name === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('name must be supplied'))
  }
  if (req.params.age === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('age must be supplied'))
  }
  
  var newUser = {
		_id: req.params.id,
		name: req.params.name, 
		age: req.params.age
	}
  
  // Update the user with the persistence engine
  usersSave.update(newUser, function (error, user) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
  })
})

// Delete user with the given id
server.del('/users/:id', function (req, res, next) {

  // Delete the user with the persistence engine
  usersSave.delete(req.params.id, function (error, user) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
  })
})



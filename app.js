/*  
    MAPD714 Assignment 1
    name: Matthew Maxwell
    id: 301200258
    author matthew maxwell
*/
var http = require('http');
var fs = require('fs')

//creates server object then calles it's listen method 
// could be assigned to var and then vanName.listen
var server = http.createServer(function (request, response) 
{
    response.writeHead(200, {'Content-Type': 'text/plain'});

    fs.readFile ('package.json', 'utf8', function(err, data)
    {
        if (err)
        {
            return console.log(err);
        }
        console.log(data)
        response.end('file:\n' + data);
    })
   // console.log('Server running at http://127.0.0.1:8081/');
    
 })
 server.listen(8081);



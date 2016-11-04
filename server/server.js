//HTTP module
var http = require('http');
var url = require("url");
var path = require('path');


var gm = require('@google/maps').createClient({
    key: 'AIzaSyCj2zCohG6DaNloA9R-Poax-O0Kknz3sD0'
});


// gm.directions('31.470656,74.412929', '31.470789,74.408619',
//     function(err, data) { console.log(JSON.stringify(data)); });



// Geocode an address. 
gm.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
    if (!err) {
        console.log(response.json.results);
    } else {
    	console.log("uiui "+response);
    }
});



const PORT = 8080;

function route(handle, pathname, response, postData) {
    console.log("Routing to: " + pathname);

    var basename = path.basename(pathname);

    //check if a request handler for the given pathname exists, and if it does, we simply call the according function
    if (typeof handle[pathname] === 'function') {
        //"Please, handle this pathname"
        handle[pathname](response, postData);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not found");
        response.end();
    }
}

function handleRequest(request, response) {

    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    //event listener for the “data” event which step by step fills our new postData variable whenever a new chunk of POST data arrives
    request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        // console.log("Received POST data: '" +
        // 	postDataChunk + "'.");
    });

    request.addListener("end", function() {
        //call router
        route(handle, pathname, response, postData);
    });
}

function startServer(route, handleList) {
    handle = handleList;

    //Create a server
    var server = http.createServer(handleRequest);

    server.listen(PORT, function() {
        //Callback triggered when server is successfully listening. Hurray!
        console.log("Server listening on: http://localhost:%s", PORT);
    });
}


exports.startServer = startServer;
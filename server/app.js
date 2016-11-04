var express = require('express');
var app = express();

var handler = require("./requesthandlers");
var maps = require("./maps");
maps.setup();

var PORT = 8080;

app.get('/', handler.hello);
app.get('/start/:id/:lat/:lng/:emotion', handler.start); // /start/1/59.325447/18.069953/angry
app.get('/checkPos/:id/:lat/:lng', handler.checkPos);
app.get('/getNextStep/:id/:lng/:lat', handler.getNextStep);

app.listen(PORT, function() {
    console.log('Wunderkind is listening on port ' + PORT + '!');
});

//ALWAYS use lat,lng

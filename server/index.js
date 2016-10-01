var express = require('express');
var app = express();


var handle = require("./requestHandlers");
var navigator = require("./navigator");

var PORT = 8080

navigator.setup();

app.get('/', handle.hello);
app.get('/start/:id/:lng/:lat/:emotion', handle.start); // /start/1/20/30/angry
app.get('/checkPos/:id/:lng/:lat/:metersWalked', handle.checkPos);
app.get('/getNextStep/:id/:lng/:lat', handle.getNextStep);

app.listen(PORT, function() {
    console.log('Wunderkind is listening on port ' + PORT + '!');
});

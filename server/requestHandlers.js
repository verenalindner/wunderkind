var destinator = require("./destinator");
var navigator = require("./navigator");

function hello(req, res) {
    res.send('hello');
}

function start(req, res) {
    //res.send('Hello World! You too');
    console.log('staring navigation from ' + req.params.lat + ', ' + req.params.lng + ' with the emotion ' + req.params.emotion);
    var p = req.params;
    var org = [p.lat, p.lng];

    //1. Find the destination. 
    var dest = destinator.findDestination(org, p.emotion);

    //2. Start Navigating
    navigator.startNav(org, dest, function(degree) {
        if (degree >= 0) {
            res.send('turn degrees: ' + degree);
        } else
            res.status(500).send('Something broke!');
    });
}

function getNextStep(req, res) {
    res.send('Hello World! You too');
    var p = req.params;

    navigator.getNextStep(p.lng, p.lat, function(degree) {
        if (degree >= 0) {
            res.send('turn degrees: ' + degree);
        } else
            res.status(500).send('Something broke!');
    });
}

function checkPos(req, res) {

}

exports.hello = hello;
exports.start = start;
exports.checkPos = checkPos;
exports.getNextStep = getNextStep;
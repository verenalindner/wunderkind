var destinator = require("./destinator");
var navigator = require("./navigator");

//the currentDirection in degrees
var currentDir = 0;

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

function setDir(req, res){
    var p = req.params;
    currentDir = p.dir; 
    console.log("the current direction is "+currentDir);
}


function getDir(req, res){
    console.log("sending the current direction of "+currentDir);
    res.send(currentDir);

}

exports.hello = hello;
exports.start = start;
exports.checkPos = checkPos;
exports.getNextStep = getNextStep;
exports.setDir = setDir;
exports.getDir = getDir;
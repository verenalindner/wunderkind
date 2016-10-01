var destinator = require("./destintor");
var navigator = require("./navigator");

function hello(req, res) {
    //res.send('Hello World! You too');
    res.send('i am angry');
}

function start(req, res) {
    //res.send('Hello World! You too');
    console.log('staring navigation from ' + req.params.lng + ', ' + req.params.lat + ' with the emotion ' + req.params.emotion);
    var p = req.params;
    var org = [p.lng, p.lat];

    //1. Find the destination. 
    var dest = destinator.findDestination(org, p.emotion);
   
    //2. Start Navigating
    var degree = navigator.startNav(org, dest);

    res.send('turn degrees:' + degree);
}

function checkPos(req, res) {
    res.send('Hello World! You too');
    var p = req.params;
    var pos = [p.lng, p.lat];
}

function getNextStep(req, res){

}



exports.hello = hello;
exports.start = start;
exports.checkPos = checkPos;
exports.getNextStep = getNextStep;
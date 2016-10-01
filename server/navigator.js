var GM;

//STATE VARIABLES
var currentStep;

//this indicates the amount of meters a user is away from the next step before the compass will change to the "next step"
var mToChangeDir = 10;
//this indicates the amount of meters a user needs to have finished of the "current step" before the compass will change to the "next step"
var percentToChangeDir = 5;


var lastPos;
var currentPos;
var steps;

function setup(){
	GM = require('@google/maps').createClient({
	    key: 'AIzaSyCj2zCohG6DaNloA9R-Poax-O0Kknz3sD0'
	});

	console.log('GM is set up');
}

//starts the navigation. 
//org should always be the current position
function startNav(org, dest) {

    currentStep = 0;

    // console.log(requestNav);
    GM.directions({
        origin: org,
        destination: dest,
        mode: 'walking',
        units: 'metric'
    }, function(err, response) {
        if (!err) {
            //Pick the first route (random). there will always be only one leg.
            var route = response.json.routes[0].legs[0];
            console.log(route);

            var distance = route.distance.value; //this is in meters
            var stepInstructions = [];

            steps = route.steps;

            //Coordinates (Lng, Lat)
            var startLoc = steps[currentStep].start_location;
            var endLoc = steps[currentStep].end_location;
           
            // calculateDirection(0, 0, 1, 0); //should be 90
            // calculateDirection(0, 0, -1, 0); //should be 270
            // calculateDirection(0, 0, 0, 1); //should be 0
            calculateDirection(startLoc.lng, startLoc.lat, endLoc.lng, endLoc.lat);
        }
    });
}

//x1 = startLng, y1 = startLat, x2 = endLng, y2 = endLat
function calculateDirection(x1, y1, x2, y2) {
	//straight north or south
	if(x1 == x2){
		if(y1 > y2)
			return 180;
		else
			return 0;
	}

    //calculate the angle to the "x axis with the slope and the arctan
    var m = (y2 - y1) / (x2 - x1);
    console.log("m = " + m);
    var angleToX = Math.atan(m);
    console.log("angleToX = " + angleToX);
    var angle;

    //check in which quadrant of the cricel the line is
    //right side
    if (x2 > x1) {
        if (y2 > y1)
            angle = 90 - angleToX;
        else
            angle = 90 + angleToX;
    } else {
        //upper left
        if (y2 > y1)
            angle = 270 + angleToX;
        else
            angle = 270 - angleToX;
    }
    console.log("angle = " + angle);
    return angle;
}


function update(metersWalked, metersToWalk) {
    if(metersWalked > metersToWalk*0.95){
        currentStep++;
    }
}

//what if there is a trun in the road??
function updateCurrentStep(pos, dest){
	currentStep++;
	calculateDirection		


	// if( (dest[0] - pos[0]) < (dest[0] - lastPos[0]){
	// 	//ok
	// } else {
	// 	//wrong!
	// }
}

//check if person walked in right direction. What does that mean? 
function checkPath(currentX, currentY, currentStep, steps) {
    if(){

    }
}

function reCalibrate() {

}




exports.setup = setup;
exports.startNav = startNav;
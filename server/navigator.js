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
var polyline = require('polyline');
var codes = require("./codes");
var maps = require("./maps");

//this indicates the amount of meters a user is away from the next step before the compass will change to the "next step"
var METERS_THRESHOLD = 7;

//STATE VARIABLES
var steps;
var polySteps;
var currentStep; //the current step of the journey
var currentPolyStep; //the current step in the current step :)

//starts the navigation. 
//org should always be the current position
function startNav(org, dest, requestResponse) {
    maps.getDirections(org, dest, function(err, response) {
        if (!err) {
            requestResponse(handleNav(response));
        } else {
            console.error('Error in calculating the Route.');
            requestResponse(-1);
        }
    });
}

function handleNav(response) {
    currentStep = 0;
    currentPolyStep = 0;

    //Pick the first route (random). there will always be only one leg.
    var route = response.json.routes[0].legs[0];
    console.log(route);

    steps = route.steps;

    //Coordinates (Lng, Lat)
    var startLoc = steps[currentStep].start_location;
    console.log("the start location is " + startLoc.lat + ',' + startLoc.lng);
    //This is the easy way of using the end location of a step: var endLoc = steps[currentStep].end_location;

    //calculate next end step: https://www.npmjs.com/package/polyline
    polySteps = polyline.decode(steps[currentStep].polyline.points);
    var endLoc = { lat: polySteps[currentPolyStep][0], lng: polySteps[currentPolyStep][1] }
    console.log("the end location is " + endLoc.lat + ',' + endLoc.lng);


    //DEBUGGING
    console.log("the decoded polyline is " + polySteps);
    console.log("there are " + polySteps.length + " points in the first step of the line");


    // calculateDirection(0, 0, 1, 0); //should be 90
    // calculateDirection(0, 0, -1, 0); //should be 270
    // calculateDirection(0, 0, 0, 1); //should be 0

    if (setNextLocation(startLoc.lat, startLoc.lng, endLoc.lat, endLoc.lng)) {
        console.log("reched destinatin!");
        return codes.REACHED;
    } else {
        var degree = calculateDirection(startLoc.lat, startLoc.lng, endLoc.lat, endLoc.lng);
        console.log("the degree to turn is " + degree);
        return degree;
    }
    return codes.ERROR;
}

//returns true if the final goal is reached
function setNextLocation(lat1, lon1, lat2, lon2) {
    console.log('welcome to set next location');
    
    //distance between the startPos and the endPos
    var distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

    var d = steps[currentStep].distance.value; //this is in meters
    console.log('the dist is ' + distance + ' and should be ' + d);

    if (distance < METERS_THRESHOLD) {
        currentPolyStep++;

        //reached the last polystep in the current steps --> go to the next step
        if (currentPolyStep >= polySteps.length) {
            currentPolyStep = 0;
            currentStep++;

            //check if destinatin is reached
            if (currentStep >= steps.length) {
                return true;
            }

        }
        //TODO!! CHECK IF IT IS STILL TOO CLOSE setNextLocation(lat1, lon1, polySteps[currentPolyStep][0], lng: polySteps[currentPolyStep][1]);
    }
    return false;
}


//x1 = startLng, y1 = startLat, x2 = endLng, y2 = endLat
function calculateDirection(y1, x1, y2, x2) {
    //straight north or south
    if (x1 == x2) {
        if (y1 > y2)
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

//get the new coordinates, indicate if the person walked in the wrong direction? 
function getNextStep(lat, lon, requestResponse) {
    var newDegree = setNextLocation(lat, lon, polySteps[currentPolyStep][0], polySteps[currentPolyStep][1]);
    requestResponse(newDegree);
}

//taken from 
//http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371000; // Radius of the earth in m
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function update(metersWalked, metersToWalk) {
    if (metersWalked > metersToWalk * 0.95) {
        currentStep++;
    }
}

exports.startNav = startNav;
exports.getNextStep = getNextStep;

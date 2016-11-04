var RADIUS = 1000; //radius in meters
var maps = require("./maps");

var activePleasant = [
	'excited',
	'enthusiastic',
	'happy',
	'cheerful',
	'pleased'
];

var pleasantDeactive = [
	'content',
	'peaceful',
	'laid-back',
	'relaxed',
	'calm'
];

var deactiveUnpleasant = [
	'lazy',
	'bored',
	'sad',
	'confused',
	'depressed'
];

var unpleasantActive = [
	'upset',
	'stressed',
	'nervous',
	'anxious',
	'tense'
];

var single = [
	'Surprise',
	'creative',
	'tired',
	'hungry'
];

function setup() {
    GM = require('@google/maps').createClient({
        key: 'AIzaSyCj2zCohG6DaNloA9R-Poax-O0Kknz3sD0'
    });
    if (GM)
        console.log('Google Maps for the destination is set up');
}

//returns [lng, lat] of the destination
function findDestination(org, emotion){


	// GM.directions({

 //        location: org,
 //        radius: RADIUS,
 //        types: food
 //        name: cruise


 //        destination: dest,
 //        mode: 'walking',
 //        units: 'metric'
 //    }, function(err, response) {
 //        if (!err) {
 //        	console.error('Error in finding a destination.');
 //            requestResponse(handleNav(response));
 //        } else {
 //            requestResponse(-1);
 //        }
 //    });

	var dest = [59.326028, 18.069055]; //TODO this is a random dest in stockholm

	return dest; 
}

function findDestinationResponse(err, response) {
	if(err)
		return -1;


}

function surprise(){

}

exports.setup = setup;
exports.findDestination = findDestination;

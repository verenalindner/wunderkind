var gm;

var PLACES = [
    'amusement_park',
    'aquarium',
    'art_gallery',
    'bakery',
    'bar',
    'beauty_salon',
    'bicycle_store',
    'book_store',
    'bowling_alley',
    'bus_station',
    'cafe',
    'campground',
    'car_rental',
    'casino',
    'cemetery',
    'church',
    'city_hall',
    'clothing_store',
    'convenience_store',
    'courthouse',
    'department_store',
    'electronics_store',
    'embassy',
    'florist',
    'food (deprecated)',
    'furniture_store',
    'gym',
    'hair_care',
    'hardware_store',
    'health (deprecated)',
    'hindu_temple',
    'home_goods_store',
    'jewelry_store',
    'library',
    'liquor_store',
    'meal_takeaway',
    'mosque',
    'movie_rental',
    'movie_theater',
    'moving_company',
    'museum',
    'night_club',
    'painter',
    'park',
    'pet_store',
    'pharmacy',
    'physiotherapist',
    'post_office',
    'restaurant',
    'shoe_store',
    'shopping_mall',
    'spa',
    'stadium',
    'store',
    'subway_station',
    'synagogue',
    'taxi_stand',
    'train_station',
    'transit_station',
    'travel_agency',
    'university',
    'zoo',
];

function setup() {
    gm = require('@google/maps').createClient({
        key: 'AIzaSyCj2zCohG6DaNloA9R-Poax-O0Kknz3sD0'
    });
    if (gm)
        console.log('Google Maps is set up');
}


function getDirections(org, dest, handleDirections) {
    gm.directions({
        origin: org,
        destination: dest,
        mode: 'walking',
        units: 'metric'
    }, handleDirections);
}

function getPlaces() {

}

exports.getDirections = getDirections;
exports.PLACES = PLACES;
exports.setup = setup;
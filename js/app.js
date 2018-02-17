// JavaScript Document
var map;
var marker;
var currentMarker = null;
var markers = [];


function initMap() {
    //create map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.088746,
            lng: 31.312691
        },
        zoom: 16
    });
    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

    var bounds = new google.maps.LatLngBounds();
    //Iterate over the restarants and create a marker for each one
    restaurants.forEach(function(restaurant) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(restaurant.coordinates),
            animation: google.maps.Animation.DROP,
            map: map,
            icon: defaultIcon,
            name: restaurant.name,
            mLat: restaurant.coordinates.lat,
            mLng: restaurant.coordinates.lng

        });
        //put the markers
        markers.push(marker);
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
        marker.addListener('click', (function(marker) {
            return function() {
                getMarkerInfo(marker);
                /*Prevents more than one marker from being animated at a time*/
                if (marker) {
                    marker.setAnimation(null);
                    currentMarker = marker;
                    currentMarker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                        currentMarker.setAnimation(null);
                    }, 1500);
                }
            };
        })(marker));
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);

    });

    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    }


    //CALL THE viewmodel
    ko.applyBindings(new viewModel());

}

function HandleError() {
    alert('Invalid Map');
}
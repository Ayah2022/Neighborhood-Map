$(document).ready(function() {
    //////////////////////////////////////////////_____RESTAURANTS DETAILS_____/////////////////////////////////////////////////////////////////////
    var restaurants = [

            {
                name: "Arabiata",
                coordinates: {
                    lat: 30.091688,
                    lng: 31.313630
                },
                address: "Al Montazah, Heliopolis, Cairo Governorate"
            }, {
                name: "Hardees",
                coordinates: {
                    lat: 30.086985,
                    lng: 31.308954
                },
                address: "13 El-Khalifa El-Maamoun, Mansheya El-Bakry, Heliopolis, Cairo Governorate"
            }, {
                name: "Majesty",
                coordinates: {
                    lat: 30.091799,
                    lng: 31.313179
                },
                address: "El-Khalifa El-Maamoun, Mansheya El-Bakry, Heliopolis, Cairo Governorate"
            }, {
                name: "KFC",
                coordinates: {
                    lat: 30.087342,
                    lng: 31.308206
                },
                address: "El-Khalifa El-Maamoun, Mansheya El-Bakry, Heliopolis, Cairo Governorate"
            }, {
                name: "Spectra Restaurant & Cafe",
                coordinates: {
                    lat: 30.089328,
                    lng: 31.312715
                },
                address: "From El-Khalifa El-Maamoun، 9 El-Tahawy, Mansheya El-Bakry, Heliopolis, Cairo Governorate"

            }, {
                name: "Abu Haider",
                coordinates: {
                    lat: 30.091605,
                    lng: 31.318721
                },
                address: "Ibrahim Al Lakani el korba, El-Montaza, Heliopolis, Cairo Governorate"

            }
        ]
        ///////////////////////////////////////////////////////////////_____MAP CREATION_____////////////////////////////////////////////////////////////

    var infowindow, map;
    var markers = [];
    window.initMap = function() {
            var styles = [{
                featureType: 'water',
                stylers: [{
                    color: '#19a0d8'
                }]
            }, {
                featureType: 'administrative',
                elementType: 'labels.text.stroke',
                stylers: [{
                    color: '#ffffff'
                }, {
                    weight: 6
                }]
            }, {
                featureType: 'administrative',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#e85113'
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#efe9e4'
                }, {
                    lightness: -40
                }]
            }, {
                featureType: 'transit.station',
                stylers: [{
                    weight: 9
                }, {
                    hue: '#e85113'
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'labels.icon',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{
                    lightness: 100
                }]
            }, {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{
                    lightness: -100
                }]
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{
                    visibility: 'on'
                }, {
                    color: '#f0e4d3'
                }]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#efe9e4'
                }, {
                    lightness: -25
                }]
            }];
            //create map
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 30.088746,
                    lng: 31.312691
                },
                zoom: 15
            });
            var currMarker = null;
            var marker;

            // Style the markers a bit. This will be our listing marker icon.
            var defaultIcon = makeMarkerIcon('0091ff');

            // Create a "highlighted location" marker color for when the user
            // mouses over the marker.
            var highlightedIcon = makeMarkerIcon('FFFF24');
            //Iterate over the restarants and create a marker for each one
            for (i = 0; i < restaurants.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(restaurants[i].coordinates),
                    animation: google.maps.Animation.DROP,
                    map: map,
                    icon: defaultIcon,
                    name: restaurants[i].name,
					mLat: restaurants[i].coordinates.lat,
					mLng: restaurants[i].coordinates.lng

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
				
          
            }


            var bounds = new google.maps.LatLngBounds();
            // Extend the boundaries of the map for each marker and display the marker
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);

            //CALL THE viewmodel
            ko.applyBindings(new ViewModel());
        }
        //google map error handling 
    function errorHandling() {
        alert("Fail to load the map. Try again")
    }

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

    ///////////////////////////////////////////////_____VIEWMODEL_____///////////////////////////////////////////////////

    var ViewModel = function() {
        var self = this;
        //store and update the writtenInput
        self.writtenInput = ko.observable('');
        //store and update markers
        self.locations = ko.observableArray();
        //iterates over markers and copy them in the locations observable array 
        for (var i = 0; i < markers.length; i++) {
            self.locations.push(markers[i]);
			infowindow = new google.maps.InfoWindow();
            var largeInfowindow = new google.maps.InfoWindow();
                // Create an click listener to open the large infowindow at each marker.
                // populates the infowindow when the marker is clicked.
                self.clickEventHandlerFunction = function(marker){
					console.log(marker);
            if(marker.name){
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 1500);
              
                self.populateInfoWindow(this, largeInfowindow);

            }
        };
        }
		 self.populateInfoWindow = function(marker, infowindow) {
			  $.ajax({
			type: "GET",
            url: 'https://api.foursquare.com/v2/venues/explore',
            dataType: 'json',
            data: {
                client_id: "ABPY10SRGGISL4NVHQ01HY3M3S3BZP3AK2AKNUX4DMPR41YT",
                client_secret: "1NLYD3DVGFIRZBCLXHK0G0V0EYZA1EHHOQVAOQFVEMB5VFSC",
                v: '20180214',
                ll: `${marker.mLat},${marker.mLng}`,
                query: marker.name
            },
            success: function(data) {
                console.log(data);
				var name=data.response.groups[0].items[0].venue.name;
                var rating = data.response.groups[0].items[0].venue.rating.text;
				console.log(rating);
                var url = data.response.groups[0].items[0].venue.url.text;
				var menu = data.response.groups[0].items[0].venue.menu.text;
                /*The infowindow is udpdated with the FourSquare api data and the infowindow is opened immediately afterwards*/
                // Check to make sure the infowindow is not already opened on this marker.
                if (infowindow.marker != marker) {
                    infowindow.marker = marker;
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    infowindow.setContent('<div>' + name + "; FourSquare Rating: " + rating.toString() + '</div>');
                    infowindow.open(map, marker);
                    // Make sure the marker property is cleared if the infowindow is closed.
                    infowindow.addListener('closeclick', function() {
                        infowindow.marker = null;
                    });
                }
            },
            /*Foursquare api error handling*/
            error: function(error) {
                alert("Error, Four Square api data could not display")
            }
        });
		 }
		  
        //list the marker filtered in the listview
        self.listedRestaurants = function(marker) {
                google.maps.event.trigger(marker, 'click');
				
            }
            //function to filter  markers based on written input
        self.filteredRestaurants = ko.computed(function() {
            //lowercase the input and store it in filter
            var filter = self.writtenInput().toLowerCase();
            //check if the written input matches any of the locations in the locations array,if doesnt match all markers stay visible on map
            if (!filter) {
                self.locations().forEach(function(item) {
                    
                    item.setVisible(true);
                });
                return self.locations();
                //if the written input matches a marker in the oc arr then the input id handled by the ArrFilter method
            } else {
                //call the arrFilter method and pass the loc.arr as an argument
                return ko.utils.arrayFilter(self.locations(), function(item) {
                    /*store the matched locations lowercased in matched variable and making sure that it is greater than or equal 0*/
                    var matched = item.name.toLowerCase().indexOf(filter) >= 0;
                    item.setVisible(matched);
					 if(item.name){
                item.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    item.setAnimation(null);
                }, 1500);
					 }
                    return matched;
                })
				
					

            }
			
        }, self);
		
    }


   

});
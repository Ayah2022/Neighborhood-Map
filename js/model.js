// JavaScript Document
var viewModel = function() {
	var self= this;
	var infowindow = new google.maps.InfoWindow();
	//observable for storing and updating the input
	self.restaurantInput = ko.observable('');
	//observable array for copying markers
	self.restaurantMarkers = ko.observableArray();
	//creating copy of markers
	for (var i=0; i< markers.length; i++){
		self.restaurantMarkers.push(markers[i]);
	}
	//animating the marker and opening the info window
	self.listedRest = function(marker){
		google.maps.event.trigger(marker, 'click');
	}
	
	
	//function to filter markers
	self.filteredRest = ko.computed(function() {
		//lowercasing ands storing the input
		var filter = self.restaurantInput().toLowerCase();
		//checking the matching of input entered to the markers
		//all markers stay visible if there is no match
		if(!filter) {
			self.restaurantMarkers().forEach(function (item){
				item.setVisible(true);
			});
			return self.restaurantMarkers();
			//handling input if not matched with knockout arrayfilter method
		} else{
			return ko.utils.arrayFilter(self.restaurantMarkers(),function(item){
				//store,lowercase marker name ,make sure it is >=0 and set visibility for matched ones
				var match = item.name.toLowerCase().indexOf(filter) >= 0;
				item.setVisible(match);
				return match;
			});
		}
	},self);
}
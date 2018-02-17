var getMarkerInfo= function (marker){
var infowindow = new google.maps.InfoWindow();
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
                var rating = data.response.groups[0].items[0].venue.rating;
                var url = data.response.groups[0].items[0].venue.url;
				if (typeof(url) == "undefined"){
					url= "The foursquare API has no URL for this restaurant";
				}
				if (infowindow.marker != marker) {
          infowindow.marker = marker;
				infowindow.setContent('<div>'+'<h4>'+name+'</h4>'+ '<h5>Rating: </h5><h5>'+rating+'</h5>'+'<h5>'+ '<a href='+url+'>'+url+'</a></h5>' +'</div>');
				infowindow.open(map,marker);
				 // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
				 
          });
        }
            },
            /*Foursquare api error handling*/
            error: function(error) {
                alert("Error, FourSquare api data could not display")
            }
        	
});
}
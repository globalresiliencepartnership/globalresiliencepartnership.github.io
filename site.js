---
---
{% include js/vendor/jquery.js %}
{% include js/vendor/fastclick.js %}
{% include js/foundation.min.js %}
{% include js/foundation/foundation.magellan.js %}

$(function(){
	$(document).foundation();
	// Init map
	L.mapbox.accessToken = 'pk.eyJ1IjoianVlIiwiYSI6InFsakR2UEkifQ.GSsNWZF7HVlLqwdhWuM2gA';
	var map = L.mapbox.map('map', 'devseed.jfkl2aak',{
		zoomControl: false
	}).setView([26, 62],3);

	// Disable drag and zoom handlers.
	map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();

	// Disable tap handler, if present.
	if (map.tap) map.tap.disable();

	var style = {
		'color':'#009EDE',
		'weight':2.2,
		'opacity':1,
		'fillOpacity':0.4
	}

	var regionNames = [
		{
		  "name": "The Sahel",
		  "coordinates": [17,9]
		},
		{
		   "name": "Horn of Africa",
		   "coordinates": [7,42]
		},
		{
		  "name": "Southeast Asia",
		  "coordinates": [11,112]
		}
	];

	$.getJSON('geojson/regions.json',function(regions){

		var horn = topojson.merge(regions,regions.objects.regions.geometries.filter(function(d){
			return d.properties.region === 'Eastern Africa'
		}));

		var sahel = topojson.merge(regions, regions.objects.regions.geometries.filter(function(d){
			return d.properties.region === 'Western Africa' || d.properties.region === 'Middle Africa'
		}));

		var seasia = topojson.merge(regions,regions.objects.regions.geometries.filter(function(d){
			return d.properties.region === 'South-Eastern Asia'
		}))

		var regions = [horn,sahel,seasia];

		regions.forEach(function(item){
			L.geoJson(item,{
				style:style,
			}).addTo(map);
		})

		regionNames.forEach(function(item){
			L.marker(new L.latLng(item.coordinates),{
				icon:L.divIcon({
					className:'region-name',
					html: item.name, //feature.properties.name
					iconSize:[200,20]
				})
			}).addTo(map);
		});

	});


});
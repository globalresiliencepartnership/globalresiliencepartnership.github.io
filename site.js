---
---
{% include js/vendor/jquery.js %}
{% include js/vendor/fastclick.js %}
{% include js/foundation.min.js %}
{% include js/foundation/foundation.magellan.js %}

$(function(){
	$(document).foundation();
	// for wide screens
	var introHeight = $('.intro .pop').height(),
		windowHeight = $(window).height();

	// nav bar location for wide big screens
	if (introHeight >= windowHeight){
		$('.intro nav').addClass('wide');
	} else {
		$('.intro nav').removeClass('wide');
	}

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
		'weight':0,
		'opacity':1,
		'fillOpacity':0.6
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
		  "name": "South and Southeast Asia",
		  "coordinates": [14,108]
		}
	];

	$.getJSON('geojson/world_110m.json',function(world){

		var sahel = [],
			horn = [],
			asia = [];

		var regions = [mergeRegion(sahel),mergeRegion(horn),mergeRegion(asia)];

		regions.forEach(function(item){
			L.geoJson(item,{
				style:style,
			}).addTo(map);
		});

		regionNames.forEach(function(item){
			L.marker(new L.latLng(item.coordinates),{
				icon:L.divIcon({
					className:'region-name',
					html: item.name,
					iconSize:[200,40]
				})
			}).addTo(map);
		});

		function mergeRegion(regionArray){
			return topojson.merge(world,world.objects.world_110m.geometries.filter(function(d){
				return regionArray.indexOf(d.properties.name) > -1
			}))
		}
	});


});
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
		'color':'#fff',
		'weight':0.5,
		'fillColor':'#0071B8', //009EDE
		'fillOpacity':0.75
	}

	$.getJSON('geojson/regions.json',function(regions){
		var geo = topojson.feature(regions,regions.objects.regions);
		L.geoJson(geo,{
			style:style
		}).addTo(map);
	});


});
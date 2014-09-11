---
---
{% include js/vendor/jquery.js %}
{% include js/vendor/fastclick.js %}
{% include js/foundation.min.js %}
{% include js/foundation/foundation.magellan.js %}

$(function(){
	$(document).foundation();
	L.mapbox.accessToken = 'pk.eyJ1IjoianVlIiwiYSI6InFsakR2UEkifQ.GSsNWZF7HVlLqwdhWuM2gA';
	var map = L.mapbox.map('map', 'jue.iddhipbe',{
		zoomControl: false
	}).setView([26, 62],3);

	// Disable drag and zoom handlers.
	map.dragging.disable();
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();

	// Disable tap handler, if present.
	if (map.tap) map.tap.disable();

});
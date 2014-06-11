---
---
{% include js/vendor/jquery.js %}
{% include js/vendor/fastclick.js %}
{% include js/foundation.min.js %}
{% include js/foundation/foundation.magellan.js %}

// site
$(function(){
	$(document).foundation();
	// var isSticky = false;
	// $(window).scroll(function(){
	// 	var nav = $('.nav'),
	// 		header = $('.header'),
	// 		navDistToTop = $(document).scrollTop() - nav.offset().top,
	// 		headerDistToTop = $(document).scrollTop() - header.offset().top;
	//
	// 	if (navDistToTop > 0){
	// 		nav.addClass('fixed');
	// 		isSticky = true;
	// 	}
	// 	console.log(isSticky)
	// })
});

// map object
var map1 = L.mapbox.map('map1','mkhandekar.ig3hdlfh',{
		zoomControl: false,
		attributionControl: false,
		infoControl: true
	}).setView([12.211, 17.974],2);
var map2 = L.mapbox.map('map2','mkhandekar.ig3j2688',{
		zoomControl: false, 
		attributionControl: false,
		infoControl: true
	}).setView([7.014, 115.884],2);
var map3 = L.mapbox.map('map3','mkhandekar.ig3gl3j3',{
		zoomControl: false,
		attributionControl: false,
		infoControl: true
	}).setView([12.211, 17.974],2);

// Disable drag and zoom handlers.
// map.dragging.disable();
map.touchZoom.disable();
// map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Disable tap handler, if present.
// if (map.tap) map.tap.disable();

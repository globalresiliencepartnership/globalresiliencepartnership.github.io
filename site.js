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
var map1 = L.mapbox.map('map1','mkhandekar.ifnjl97k',{
		zoomControl: false
	}).setView([19.15,14.99],2);
var map2 = L.mapbox.map('map2','mkhandekar.ifnjp7h5',{
		zoomControl: false
	}).setView([50,80],2);
var map3 = L.mapbox.map('map3','mkhandekar.ifm539i7',{
		zoomControl: false
	}).setView([50,40],2);

// Disable drag and zoom handlers.
// map.dragging.disable();
map.touchZoom.disable();
// map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Disable tap handler, if present.
// if (map.tap) map.tap.disable();

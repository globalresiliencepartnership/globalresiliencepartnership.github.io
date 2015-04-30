---
---
{% include scripts/vendor/jquery.js %}
{% include scripts/vendor/fastclick.js %}
{% include scripts/foundation.min.js %}
{% include scripts/vendor/handlebars-v3.0.0.js %}
{% include scripts/foundation/foundation.dropdown.js %}
{% include scripts/foundation/foundation.topbar.js %}
{% include scripts/foundation/foundation.tooltip.js %}
{% include scripts/foundation/foundation.magellan.js %}

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

	if (!$('#map').length) {
		return;
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

	$.getJSON('{{site.baseurl}}/geojson/world_110m.json',function(world){

		var sahel = [],
			horn = [],
			asia = [];

		var regions = [mergeRegion(sahel),mergeRegion(horn),mergeRegion(asia)];

		regions.forEach(function(item){
			L.geoJson(item,{
				style:style
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

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('shortMonth', function(date) {
  return getMonthShort(date.getMonth() + 1);
});

Handlebars.registerHelper('monthTag', function(date) {
  return getMonthShort(date.getMonth() + 1).toLowerCase() + date.getFullYear();
});


////////////////////////////////////////////////
// Calendar page.
$(function() {

  if (!$('#calendar').length) {
    return;
  }

  var _template = null;
  var _data = [];
  // To avoid callback hell we keep a manual tracker
  // of loaded stuff.
  // Everything can be loaded in parallel:
  // - calendar.tlp.html
  // - calendar-month.part.html
  // - calendar-entry.part.html
  // - json data
  var _loaded = 0;

  $.get('{{site.baseurl}}/assets/templates/calendar.tlp.html', function(data) {
    _template = Handlebars.compile(data);

    _loaded++;
    init();
  });

  $.get('{{site.baseurl}}/assets/templates/calendar-month.part.html', function(data) {
    Handlebars.registerPartial('calendar-month', data);

    _loaded++;
    init();
  });

  $.get('{{site.baseurl}}/assets/templates/calendar-entry.part.html', function(data) {
    Handlebars.registerPartial('calendar-entry', data);

    _loaded++;
    init();
  });

  $.get('{{site.baseurl}}/calendar/calendar.json', function(data) {
    var grouped = {};

    // Group.
    // {
    //  "date" : [ obj... ]
    // }
    data.forEach(function(obj) {
      var date = new Date(obj.date);
      var groupName = getMonth(date.getMonth() + 1) + ' ' + date.getFullYear();

      if (!(groupName in grouped)) {
        grouped[groupName] = [];
      }

      obj.dateFormatted =  getMonth(date.getMonth() + 1) + ' ' + date.getDate() + ', ' + date.getFullYear();
      grouped[groupName].push(obj)
    });

    // Sort events by month and.
    // Convert grouped object to array.
    // We can't guarantee that the order of object keys are kept.
    // [
    //  label: "label",
    //  entries: [
    //    {
    //      obj...
    //    }
    //  ]
    // ]
    var groupedArray = [];
    for (var  i in grouped) {
      grouped[i].sort(function(a, b) {
        return a.date > b.date;
      });

      // Create a date for the group. Use the first entry's month.
      var groupDate = (new Date(grouped[i][0].date));
      groupDate.setDate(1);

      groupedArray.push({
        label: i,
        date: groupDate,
        entries: grouped[i]
      });
    }

    groupedArray.sort(function(a, b) {
      return groupDate.getTime() > groupDate.getTime();
    })

    // Remove past months
    var now = new Date();
    groupedArray = groupedArray.filter(function(obj) {
      return obj.date.getMonth() >= now.getMonth();
    });

    _data = groupedArray;

    _loaded++;
    init();
  });

  // Called after every async request.
  // It will only fire when everything was loaded.
  function init() {
    // Stop right here if there's something missing.
    if (_loaded < 4) {
      return;
    }

    $('#calendar').html(_template({calendar: _data}));

    $('#calendar .card').each(function() {
      var $this = $(this);
      var $content = $this.find('.content');

      if ($content[0].offsetHeight < $content[0].scrollHeight) {

        $this.find('.more').addClass('revealed').click(function(e) {

          $content.animate({
            'max-height': '9999px'
          });
          $(this).hide();
        });

      }
    });

    $('.calendar-nav a').click(function(e) {
      e.preventDefault();
      var target = this.getAttribute('href');
      $(document).scrollTop($(target).offset().top - 100);
    });

  }

});

function getMonth(num) {
  var m = ["January", "February","March","April","May","June","July","August","September","October","November","December"];
  return m[num - 1];
}

function getMonthShort(num) {
  var m = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return m[num - 1];
}

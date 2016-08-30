---
---
{% include scripts/jquery.flexslider.js %}

$(window).load(function () {
  $('.flexslider').flexslider({
    animation: "slide",
    customDirectionNav: $(".custom-navigation a"),
    start: function (slider) {
      $('body').removeClass('loading');
    }
  });
});
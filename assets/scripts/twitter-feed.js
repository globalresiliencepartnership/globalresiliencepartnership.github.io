---
---
{% include scripts/twitter/codebird.js %}
{% include scripts/twitter/doT.js %}
{% include scripts/twitter/moment.js %}
{% include scripts/twitter/jquery.socialfeed.js %}

$(document).ready(function () {
  twitterFeed();
  function twitterFeed() {
    $('.socialfeed ul').socialfeed({
      twitter: {
        accounts: ['@grp_resilience'],
        limit: 5,
        consumer_key: 'qzRXgkI7enflNJH1lWFvujT2P',
        consumer_secret: '8e7E7gHuTwyDHw9lGQFO73FcUwz9YozT37lEvZulMq8FXaPl8O'
      },
      template: "",
      template_html: '<li class="hidden"></li>',
      moderation: function(content) {

        console.log(content);

        $(".socialfeed ul").append('<li class="twitter-post"> \
          <img src="'+content.author_picture+'" class="pull-left profile" /> \
        <h6>'+content.author_name+'</h6><span class="date pull-right"> '+content.time_ago+'</span>\
        <p>'+content.text+' \
        <a href="'+content.link+'" target="_blank">read more</a> \
        </p> \
        </li>')

      }
    });
  }
  
});
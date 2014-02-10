
$(document).ready(function() {
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON('people.json', function(data) {
      $.each( data.users, function( i, item ) {

        $('<li class="mix '+item.Team+' '+item.Spec.fir+' '+item.Spec.sec+'  mix_all" data-user="'+item.User+'"  id="trump'+i+'" style="display: inline-block; opacity: 1;">').html(
          '<div class="team">' + item.Team + '</div>'
          ).prependTo('.people');

        $('<div class="content">').html(
          '<h5>' + item.Name + '</h5>' +
          '<p>' + item.Post + '</p>' +
          '<div class="img_wrapper loaded" style="background-image: url('+item.Photo+');"><img src="'+item.Photo+'"></div>'
          ).appendTo("#trump"+i);

        // $("<img>").attr("src", item.Photo).appendTo("#trump"+i);      
        

        var items = [];
        $.each( item.Spec, function( key, val ) {
          items.push( "<li>" + val + "</li>" );
        });
       
        $( "<ul/>", {
          "class": "skills", html: items.join( "" )
        }).appendTo("#trump"+i);

      });

    });
});


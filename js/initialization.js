
$(document).ready(function() {
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON('people.json', function(data) {
      $.each( data.users, function( i, item ) {

        $('<li class="grid-33 mobile-grid-50">').html('<div class="trump + '+item.Team+'" id="trump'+i+'" data-user="'+item.User+'">' + '<div class="team">' + item.Team + '</div>' + '</div>').appendTo('.people');
        $('<div class="name">').html('<h2>' + item.Name + '</h2>').appendTo("#trump"+i);
        $('<div class="post">').html('<p>' + item.Post + '</p>').appendTo("#trump"+i);
        $("<img>").attr("src", item.Photo).appendTo("#trump"+i);
        
        

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


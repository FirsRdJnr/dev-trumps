/*
MixItUp Marketing Site Javascript
http://www.barrelny.com
*/

var latest = "https://github.com/barrel/mixitup/archive/v1.5.5.zip";

/* SHARED VARS */

var firstrun = true,
    liveEffects = ['fade','scale'],
    liveEasing = 'smooth',
    liveSpeed = 500,
    touch = false,
    list = false,
    clickEv = 'click';



function card() {
    return $.getJSON('people.json', function(data) {
        $.each( data.users, function( i, item ) {
            var card;

            card = $('<li class="mix '+item.Team+' '+item.Spec.fir+' '+item.Spec.sec+'" data-user="'+item.User+'">').html('<div class="team">' + item.Team + '</div>')

            $('<div class="content">').html('<h5>' + item.Name + '<small>' + item.Post + '</small>' +'</h5>' +
              '<div class="img_wrapper loaded" style="background-image: url('+item.Photo+');"><img src="'+item.Photo+'"></div>').appendTo(card);

            var items = [];
            $.each( item.Spec, function( key, val ) {
                items.push( "<li>" + val + "</li>" );
            });

            $( "<ul/>", {"class": "skills", html: items.join( "" )}).appendTo(card);



            $('.people').prepend(" ").prepend(card)

          });


        });

}
function mixdevs(){

    // INSTANTIATE MIXITUP ON devs
    $('#devs').mixitup({
        buttonEvent: clickEv,
        onMixStart: function(config){

            // PAUSE LOGO ON devs ACTIVITY
            if(typeof timer != 'undefined'){
                clearInterval(timer);
            };
            if(typeof counter != 'undefined'){
                clearInterval(counter);
            };

            // UPDATE EFFECTS LIST
            config.effects = liveEffects;

            // UPDATE EASING
            config.easing = liveEasing;

            // UPDATE SPEED
            config.transitionSpeed = liveSpeed;

            return config;
        },
        onMixEnd: function(config){

            // ADD LIST STYING
            var wait = setTimeout(function(){
                if(config.layoutMode == 'list'){
                    list = true;
                    $('#devs .mix').addClass('full_width');
                };
            },100);
        }
    });
}


/* ====== EVENT HANDLERS ====== */

function eventHandlers(){

    /* GRID/LIST */
    $('#GoList').bind(clickEv, function(e){
        $('.button.layout').removeClass('active');
        $(this).addClass('active');
        $('#devs').mixitup('toList');
    });

    $('#GoGrid').bind(clickEv, function(e){
        if(list){
            $('.button.layout').removeClass('active');
            $(this).addClass('active');
            var delay = setTimeout(function(){
                $('#devs .mix').removeClass('full_width');
                $('#devs').mixitup('toGrid');
            });
        };
    });

}

/* ====== ON DOCU READY ====== */

$(function(){

    /* DETECT PLATFORM */
    $.support.touch = 'ontouchend' in document;

    if ($.support.touch) {
        touch = true;
        $('body').addClass('touch');
        clickEv = 'touchclick';
    };

    /* INSTANTIATE devs */
    $.when(card()).done(function(){
        /* INSTANTIATE devs */
        mixdevs();

        /* EVENT HANDLERS */
        eventHandlers();
    }
)
});
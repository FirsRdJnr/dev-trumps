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
            var card,
                curdate = new Date().getTime(),
                momentTime = moment.duration(curdate-moment(item.Start, "DDMMYYYY").valueOf()),
                momentYears = momentTime.years(),
                momentMonths = momentTime.months(),
                start = "";

            if (momentYears>0) {
                start += momentYears + "Y"+ " ";
            }

            if (momentMonths>0) {
                start += momentMonths + "M"+ " ";
            }


            card = $('<li class="mix '+space2_(item.Team)+' '+space2_(item.Spec.fir)+' '+space2_(item.Spec.sec)+'" data-user="'+item.Name+'">').html('<div class="team">' + item.Team + '</div>')

            $('<div class="content">').html('<h5>' + item.Name + '<small>' + item.Post + '</small>' +'</h5>' +
              '<div class="img_wrapper loaded" style="background-image: url('+item.Photo+');"><img src="'+item.Photo+'"></div>').appendTo(card);

            var items = [];
            $.each( item.Spec, function( key, val ) {
                items.push( "<li title="+ val +">" + val + "</li>" );
            });

            $( "<ul/>", {"class": "skills", html: items.join( "" )}).appendTo(card);

            $('<div class="info">').html('<p class="start">' + start +'</p>' + '<p class="email"> Email: <a href="mailto:'+ item.Email +'@frogtrade.com">' + item.Email +'</a></p>').appendTo(card);

            $('.people').prepend(" ").prepend(card)

          });


        });
}

function space2_(str){
    return str.split(" ").join("_").toLowerCase();
}
function mixdevs(){

    var filters = "";
    $('ul#team .button, ul#skills .button').each(function(){
        filters += $(this).data('filter') + " ";
    })

    // INSTANTIATE MIXITUP ON devs
    $('#devs').mixitup({
        buttonEvent: "click",
        multiFilter: true,
        showOnLoad: filters.trim(),
        sortOnLoad: ['data-user', 'desc'],
        sortSelector: '.sort',
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

function setupButtons() {
    $("ul#team li.button, ul#skills li.button").on("click", function(){
        var teamfilter = "",
            skillfilter = "";

        if ($(this).hasClass("all")) {
            $('ul#team .button.active:not(.all)').removeClass("active")
        } else {
            $('ul#team .button.active.all').removeClass("active")
        }

        $(this).toggleClass("active")

        $('ul#team .button.active').each(function(){
            teamfilter += $(this).data('filter') + " ";
        })

        $('ul#skills .button.active').each(function(){
            skillfilter += $(this).data('filter') + " ";
        })

        $('#devs').mixitup('filter', [teamfilter.trim(), skillfilter.trim()])
    });
}

/* ====== ON DOCU READY ====== */

$(function(){

    /* INSTANTIATE devs */
    $.when(card()).done(function(){
        /* INSTANTIATE devs */
        mixdevs();

        /* EVENT HANDLERS */
        eventHandlers();

        setupButtons();
    }
)
});
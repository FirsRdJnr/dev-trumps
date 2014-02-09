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

/* SANDBOX */

function mixSandBox(){
	
	// INSTANTIATE MIXITUP ON SANDBOX
	
	$('#SandBox').mixitup({
		buttonEvent: clickEv,
		onMixStart: function(config){
			
			// PAUSE LOGO ON SANDBOX ACTIVITY
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
					$('#SandBox .mix').addClass('full_width');
				};
			},100);
		}
	});
}

/* BACK TO TOP BUTTON */

function backToTop(){
	var ww = $(window).width();
	var bttMar = ((ww - 860) / 2) - 80;
	$('#BackToTop').css('right',bttMar+'px')	
}



/* ====== EVENT HANDLERS ====== */

function eventHandlers(){

	/* GRID/LIST */
	
	$('#GoList').bind(clickEv, function(e){
		$('.button.layout').removeClass('active');
		$(this).addClass('active');
		$('#SandBox').mixitup('toList');
	});
	
	$('#GoGrid').bind(clickEv, function(e){
		if(list){
			$('.button.layout').removeClass('active');
			$(this).addClass('active');
			var delay = setTimeout(function(){
				$('#SandBox .mix').removeClass('full_width');
				$('#SandBox').mixitup('toGrid');
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
	
	/* POSITION BACK TO TOP BUTTON */
	
	backToTop();
	
	/* INSTANTIATE SANDBOX */
	
	mixSandBox();
	
	/* EVENT HANDLERS */
	
	eventHandlers();
	
});
// scrollTo
$(document).ready(function(){

    $('nav a,footer a.up,.top a.up').click(function(e){

        $.scrollTo( this.hash || 0, 1500);
        e.preventDefault();
    });


$("#gallery").click(function() {
    $('html, body').animate({
        scrollTop: $("#gallery").offset().top
    }, 2000);
});    

// toggle

    $(".toggle_container").hide();
    $("h4.trigger").click(function(){
        $(this).toggleClass("active").next().slideToggle("slow");
        return false;
    });

// slider
    $('.work-gal').bxSlider({
        adaptiveHeight: true,
        captions: true,
        nextSelector: '#slider-next',
        prevSelector: '#slider-prev',
        nextText: 'Onward →',
        prevText: '← Go back',
        pagerCustom: '#bx-pager'

    });

// Parallax Scrolling Tutorial
// For NetTuts+

// Author: Mohiuddin Parekh
//  http://www.mohi.me
//  @mohiuddinparekh

    // Cache the Window object
    $window = $(window);

   $('section[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function() {

            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });

        }); // window scroll Ends
    });

});

// email form
function checkForm() {
 document.form.Email.value = " " + document.form.Email.value;

  if (document.form.Name.value == "") {
      alert('The Name field is empty!'); return false; }

  if (document.form.Company.value == "") {
      alert('The Company field is empty!'); return false; }

  mail = document.form.Email.value;
  if ((mail.indexOf('@') == -1) || (mail.indexOf('.') == -1)) {
      alert('The E-mail address is invalid!'); return false; }

  if (document.form.Query.value.length > 250) {
      alert('The Comments / Query is too long!'); return false; }

  window.setTimeout("history.back(-1)",2000);
  return true;
 }



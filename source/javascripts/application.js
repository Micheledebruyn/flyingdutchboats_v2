//= require jquery
//= require bootstrap
//= require carousel/owl.carousel
//= require modernizr.custom
//= require classie
//= require demo7
//= require snap.svg-min

document.addEventListener("touchstart", function() {},false);

$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});


$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

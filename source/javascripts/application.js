//= require jquery
//= require bootstrap
//= require carousel/owl.carousel
//= require modernizr.custom
//= require classie
//= require demo7
//= require snap.svg-min

document.addEventListener("touchstart", function() {},false);

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    stagePadding: 50,
    loop: true
  });
});

var tabs = document.querySelectorAll('.tab')
var tabContents = document.querySelectorAll('.tab-content')


tabs.forEach(function(tab) {
  tab.addEventListener('click', function(event) {
    event.preventDefault();
    var target = event.currentTarget.dataset.target
    clearTabContents()
    document.getElementById(target).classList.remove('hidden')
    clearTabs()
    tab.classList.add('active')
    tab.innerHTML = "●";
  });
})


function clearTabContents() {
  tabContents.forEach(function(tabContent) {
    tabContent.classList.add('hidden')
  });
}

function clearTabs() {
  tabs.forEach(function(tab) {
    tab.classList.remove('active')
    tab.innerHTML = "○";
  });
}

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


var allListItems = document.querySelectorAll('.two-column-list li');

allListItems.forEach(function(item) {
  var highlightOne = function(event) {
    allListItems.forEach(function(item) {
      item.classList.add('disabled');
    });
    event.currentTarget.classList.remove('disabled');
  }

  item.addEventListener('click', highlightOne);
  item.addEventListener('mouseenter', highlightOne);
});


document.querySelectorAll('.two-column-list ul').forEach(function(item) {
  item.addEventListener('mouseleave', function(event) {
    allListItems.forEach(function(item) {
      item.classList.remove('disabled');
    });
  });
});





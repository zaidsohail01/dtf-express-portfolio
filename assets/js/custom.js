(function ($) {
	
	"use strict";

	// Header Type = Fixed
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });


	$('.loop').owlCarousel({
      center: true,
      items:1,
      loop:true,
      autoplay: true,
      nav: true,
      margin:0,
      responsive:{ 
          1200:{
              items:5
          },
          992:{
              items:3
          },
          760:{
            items:2
        }
      }
  });
	

	// Menu Dropdown Toggle
  if($('.menu-trigger').length){
    $(".menu-trigger").on('click', function() { 
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }


  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var width = $(window).width();
        if(width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);  
        }       
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
      $(document).on("scroll", onScroll);
      
      //smoothscroll
      $('.scroll-to-section a[href^="#"]').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");
          
          $('.scroll-to-section a').each(function () {
              $(this).removeClass('active');
          })
          $(this).addClass('active');
        
          var target = this.hash,
          menu = target;
          var target = $(this.hash);
          $('html, body').stop().animate({
              scrollTop: (target.offset().top) + 1
          }, 500, 'swing', function () {
              window.location.hash = target;
              $(document).on("scroll", onScroll);
          });
      });
  });

  function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.nav a').each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.nav ul li a').removeClass("active");
              currLink.addClass("active");
          }
          else{
              currLink.removeClass("active");
          }
      });
  }


  // Acc
  $(document).on("click", ".naccs .menu div", function() {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
        $(".naccs .menu div").removeClass("active");
        $(".naccs ul li").removeClass("active");

        $(this).addClass("active");
        $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

        var listItemHeight = $(".naccs ul")
          .find("li:eq(" + numberIndex + ")")
          .innerHeight();
        $(".naccs ul").height(listItemHeight + "px");
      }
  });


	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });

	

	// Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function() {
      if(width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }




})(window.jQuery);

// Ensure service videos are muted and volume is zero (extra safety)
document.addEventListener('DOMContentLoaded', function(){
  var vids = document.querySelectorAll('.service-video');
  vids.forEach(function(v){
    try{
      v.muted = true;
      v.volume = 0;
      // Re-apply if the video starts playing later
      v.addEventListener('play', function(){ v.muted = true; v.volume = 0; }, {passive:true});
      // If a video is paused unexpectedly, try to resume it
      v.addEventListener('pause', function(){
        try{ if(!v.ended) v.play(); }catch(e){}
      });
      // Ensure loop/play in case browser throttles playback on visibility change
      document.addEventListener('visibilitychange', function(){
        if(document.visibilityState === 'visible'){
          try{ v.play(); }catch(e){}
        }
      });
    }catch(e){ /* ignore */ }
  });
});

// Enhance button opens the corresponding video in fullscreen
document.addEventListener('click', function(e){
  var btn = e.target.closest && e.target.closest('.video-enhance');
  if(!btn) return;
  var wrap = btn.closest('.video-wrap');
  if(!wrap) return;
  var vid = wrap.querySelector('video');
  if(!vid) return;
  try{
    // request fullscreen and ensure the video shows without crop
    if(vid.requestFullscreen){ vid.requestFullscreen(); }
    else if(vid.webkitEnterFullscreen){ vid.webkitEnterFullscreen(); }
    // show controls when fullscreen for user convenience
    try{ vid.controls = true; }catch(e){}
  }catch(err){ /* ignore fullscreen errors */ }
});

// Remove controls when exiting fullscreen
document.addEventListener('fullscreenchange', function(){
  var v = document.querySelector('video:fullscreen');
  if(!v){
    // no fullscreen video; remove controls from all service videos
    document.querySelectorAll('.service-video').forEach(function(vid){ try{ vid.controls = false; }catch(e){} });
  }
});
document.addEventListener('webkitfullscreenchange', function(){
  var v = document.querySelector('video:-webkit-full-screen');
  if(!v){ document.querySelectorAll('.service-video').forEach(function(vid){ try{ vid.controls = false; }catch(e){} }); }
});
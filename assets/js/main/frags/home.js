var app = angular.module('myapp');

app.controller('homeCtrl', function($scope, Modalidad, Area) {

	// $( ".md-button" ).hover(function() {
	// 	$( this ).fadeOut( 100 );
	// 	$( this ).fadeIn( 500 );
	// });

	var self = this

	var scrollMagicController = new ScrollMagic.Controller();

	new TimelineMax()
	.from($('.fondo'), 1, { x: '100px', opacity : 0 , ease: Power2.easeIN })
	.fromTo($('.main-slider'), 1, { opacity : 0 , ease: Power2.easeIN }, {opacity: 1 }, "-=.2")
	.from($('.slogan-container'), 1, { x: '100px', opacity : 0 , ease: Power2.easeIN }, "-=.5")
	.add('loader')
	.from($('.evento .izquierda'), 1, { width: '0%', opacity : 0 , ease: Power2.easeIN }, 'loader')
	.from($('.evento .derecha'), 1, { width: '100%', opacity : 0 , ease: Power2.easeIN }, 'loader')

	$('.leadership').each(function(){

		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: .5,
			duration: $(this).height() / 2
		})
		.setTween(
			new TimelineLite()
			// .from(this, 1, { x: '-100%' })
			.from('.leadership .content', 1, { x: '-100%' }, "-=.5")
			.from('.leadership .descripcion', 1, { x: '-100%', opacity : 0 })
			.from('.leadership .titulo', 1, { x: '-100%', opacity : 0 })
		)
		// .setPin(self)
		// .addIndicators()
		.addTo(scrollMagicController);
	});

	$('.bilateral').each(function(){

		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: .5,
			duration: $(this).height() / 2
		})
		.setTween(
			new TimelineLite()
			// .from(this, 1, { x: '100%' })
			.from('.bilateral .content', 1, { x: '100%' }, "-=.5")
			.from('.bilateral .descripcion', 1, { x: '100%', opacity : 0 })
			.from('.bilateral .titulo', 1, { x: '100%', opacity : 0 })
		)
		// .setPin(self)
		// .addIndicators()
		.addTo(scrollMagicController);
	});

	$('.intro-container').each(function(){

		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: .5,
			duration: '200px'
		})
		.setTween(
			new TimelineLite()
			.from('.descripcion', 1, { y: '-50px', opacity: 0 })
			.from('.modalidades', 1, { y: '-50px', opacity: 0 })
		)
		// .setPin(self)
		// .addIndicators()
		.addTo(scrollMagicController);
	});

	$('.formulario').each(function(){

		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: .5,
			duration: $(this).height() * .75
		})
		.setTween(
			new TimelineLite()
			.from('.formulario-content', 1, { y: '-50px', opacity: 0 })
		)
		// .setPin(self)
		// .addIndicators()
		.addTo(scrollMagicController);
	});

	Modalidad.obtener()
	.then(res => self.modalidades = res.data)
	.then(() => $scope.$digest())

	Area.obtener()
	.then(res => self.areas = res.data)
	.then(() => $scope.$digest())

	function reAjustarBefore(){

		$('.fondo').attr('borderright','50px solid red');


		var win = $(".fondo"),
		width = win.width()
		height = win.height()

		$(".fondo").css({
			"border-bottom" : height / 2,
			"border-top" : height / 2
		})

	}

	var slideWrapper = $(".main-slider"),
	    iframes = slideWrapper.find('.embed-player'),
	    lazyImages = slideWrapper.find('.slide-image'),
	    lazyCounter = 0;

	// POST commands to YouTube or Vimeo API
	function postMessageToPlayer(player, command){
	  if (player == null || command == null) return;
	  player.contentWindow.postMessage(JSON.stringify(command), "*");
	}

	// When the slide is changing
	function playPauseVideo(slick, control){
	  var currentSlide, slideType, startTime, player, video;

	  currentSlide = slick.find(".slick-current");
	  slideType = currentSlide.attr("class").split(" ")[1];
	  player = currentSlide.find("iframe").get(0);
	  startTime = currentSlide.data("video-start");

	  if (slideType === "vimeo") {
	    switch (control) {
	      case "play":
	        if ((startTime != null && startTime > 0 ) && !currentSlide.hasClass('started')) {
	          currentSlide.addClass('started');
	          postMessageToPlayer(player, {
	            "method": "setCurrentTime",
	            "value" : startTime
	          });
	        }
	        postMessageToPlayer(player, {
	          "method": "play",
	          "value" : 1
	        });
	        break;
	      case "pause":
	        postMessageToPlayer(player, {
	          "method": "pause",
	          "value": 1
	        });
	        break;
	    }
	  } else if (slideType === "youtube") {
	    switch (control) {
	      case "play":
	        postMessageToPlayer(player, {
	          "event": "command",
	          "func": "mute"
	        });
	        postMessageToPlayer(player, {
	          "event": "command",
	          "func": "playVideo"
	        });
	        break;
	      case "pause":
	        postMessageToPlayer(player, {
	          "event": "command",
	          "func": "pauseVideo"
	        });
	        break;
	    }
	  } else if (slideType === "video") {
	    video = currentSlide.children("video").get(0);
	    if (video != null) {
	      if (control === "play"){
	        video.play();
	      } else {
	        video.pause();
	      }
	    }
	  }
	}

	// Resize player
	function resizePlayer(iframes, ratio) {
	  if (!iframes[0]) return;
	  var win = $(".main-slider"),
	      width = win.width(),
	      playerWidth,
	      height = win.height(),
	      playerHeight,
	      ratio = ratio || 16/9;

	  iframes.each(function(){
	    var current = $(this);
	    if (width / ratio < height) {
	      playerWidth = Math.ceil(height * ratio);
	      current.width(playerWidth).height(height).css({
	        left: (width - playerWidth) / 2,
	         top: 0
	        });
	    } else {
	      playerHeight = Math.ceil(width / ratio);
	      current.width(width).height(playerHeight).css({
	        left: 0,
	        top: (height - playerHeight) / 2
	      });
	    }
	  });
	}

	// DOM Ready
	$(function() {
	  // Initialize
	  slideWrapper.on("init", function(slick){
	    slick = $(slick.currentTarget);
	    setTimeout(function(){
	      playPauseVideo(slick,"play");
	    }, 1000);
	    resizePlayer(iframes, 16/9);
	  });
	  slideWrapper.on("beforeChange", function(event, slick) {
	    slick = $(slick.$slider);
	    playPauseVideo(slick,"pause");
	  });
	  slideWrapper.on("afterChange", function(event, slick) {
	    slick = $(slick.$slider);
	    playPauseVideo(slick,"play");
	  });
	  slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
	    lazyCounter++;
	    if (lazyCounter === lazyImages.length){
	      lazyImages.addClass('show');
	      // slideWrapper.slick("slickPlay");
	    }
	  });

	  //start the slider
	  slideWrapper.slick({
	    // fade:true,
	    autoplaySpeed:4000,
	    lazyLoad:"progressive",
	    speed:600,
	    arrows:false,
	    dots:true,
	    cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)"
	  });
	});

	// Resize event
	$(window).on("resize.slickVideoPlayer", function(){
		resizePlayer(iframes, 16/9);
		reAjustarBefore()
	});

});

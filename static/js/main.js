jQuery(function ($) {

    'use strict';
	
	/*==============================================================*/
    // Table of index
    /*==============================================================*/

    /*==============================================================
    # Mobile Toggle Control
    # Menu add class
    # Menu Scrolling
	# Slider images Source
    # Parallax Scrolling
    # Magnific Popup
    ==============================================================*/

	/*==============================================================*/
	//Mobile Toggle Control
	/*==============================================================*/
	
	
	/*==============================================================*/
    // Search
    /*==============================================================*/

    (function () {

        $('.fa-search').on('click', function() {
            $('.search').fadeIn(500, function() {
              $(this).toggleClass('search-toggle');
            });     
        });

        $('.search-close').on('click', function() {
            $('.search').fadeOut(500, function() {
                $(this).removeClass('search-toggle');
            }); 
        });

    }());
	
	
	
	/*==============================================================*/
    // Menu add class
    /*==============================================================*/
	(function () {	
		function menuToggle(){
			var windowWidth = $(window).width();
			if(windowWidth > 767 ){
				$(window).on('scroll', function(){
					if( $(window).scrollTop()>60 ){
						$('.navbar').addClass('navbar-fixed-top');
					} else {
						$('.navbar').removeClass('navbar-fixed-top');
					};
					if( $(window)){
						$('#home-three .navbar').addClass('navbar-fixed-top');
					} 
				});
			}else{
				
				$('.navbar').addClass('navbar-fixed-top');
					
			};	
		}

		menuToggle();
	}());
	
	
	/*==============================================================*/
    // Parallax Scrolling
    /*==============================================================*/
	
	(function () {
		function parallaxInit() {				
			$("#ticket").parallax("50%", 0.3);
			$("#choose-color").parallax("50%", 0.3);
			$("#blue #choose-color").parallax("50%", 0.3);
		}	
		parallaxInit();
	}());
	
	
	
	/*==============================================================*/
    // Fun Facts
    /*==============================================================*/
	
	(function () {

        $('#fun-facts, #achievement').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).find('.timer').each(function () {
                    var $this = $(this);
                    $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
                $(this).unbind('inview');
            }
        });

    }());
	
	
	/*==============================================================*/
    // Tabs Slide
    /*==============================================================*/
	(function () {
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {    
			var target = $(this).attr('href');  			  
			$(target).css('top','-'+$(window).width()+'px');   
			var top = $(target).offset().top;
			$(target).css({top:top}).animate({"top":"0px"}, "-20");
		})
	}());
	
	
	/*==============================================================*/
    // Magnific Popup
    /*==============================================================*/
	
	(function () {
		$('.image-link').magnificPopup({
			gallery: {
			  enabled: true
			},		
			type: 'image' 
		});
		$('.feature-image .image-link').magnificPopup({
			gallery: {
			  enabled: false
			},		
			type: 'image' 
		});
		$('.image-popup').magnificPopup({	
			type: 'image' 
		});
		$('.video-link').magnificPopup({type:'iframe'});
	}());
	
	
	/*==============================================================*/
    // Home Text Slide
    /*==============================================================*/
	(function () {
		var win = $(window),
			foo = $('#typer');
		foo.typer(["Inroducing The World's Best", "Get New Idea's - New Concept", "Build Your Dream With"]);
		foo = $('#promotion h1');
		foo.typer(["Want to Work with Us?", "Make your dreams come true"]);	
	}());
	
	
	/*==============================================================*/
    // Twenty20 Plugin
    /*==============================================================*/
	(function () {
		$(window).load(function() {
			$(".layer-slide").twentytwenty();
		});
	}());
	
	
	/*==============================================================*/
    // Accordion
    /*==============================================================*/
	
	(function () {
		$('.faqs .collapse').on('shown.bs.collapse', function(){
		$(this).parent().find(".fa-plus-circle").removeClass("fa-plus-circle").addClass("fa-minus-circle");
		}).on('hidden.bs.collapse', function(){
		$(this).parent().find(".fa-minus-circle").removeClass("fa-minus-circle").addClass("fa-plus-circle");
		});
		
		$('.faqs .panel-heading').on('click', function() {
			if (!$(this).hasClass('active'))
			{
			  $('.panel-heading').removeClass('active');
			  $(this).addClass('active'); 
			  setIconOpened(this);
			}
			else
			{    
			  if ($(this).find('b').hasClass('opened'))
			  {
				setIconOpened(null);
			  }
			  else
			  {
				setIconOpened(this);
			  }
			}
		});
		
	}());
	
	
	
	/*==============================================================*/
    // projects Filter
    /*==============================================================*/

	(function () {
		$(window).load(function(){
		  var $portfolio_selectors = $('.project-filter >ul>li>a');
			var $portfolio = $('#projects');
			$portfolio.isotope({
				itemSelector : '.project-content',
				layoutMode : 'fitRows'
			});
			
			$portfolio_selectors.on('click', function(){
				$portfolio_selectors.removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$portfolio.isotope({ filter: selector });
				return false;
			});
			
		});

    }());
	
	
	
	/*==============================================================*/
    // Architect Filter
    /*==============================================================*/

	(function () {
		$(window).load(function(){
		  var $portfolio_selectors = $('.architect-filter >ul>li>a');
			var $portfolio = $('#all-architect');
			$portfolio.isotope({
				itemSelector : '.architect',
				layoutMode : 'fitRows'
			});
			
			$portfolio_selectors.on('click', function(){
				$portfolio_selectors.removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$portfolio.isotope({ filter: selector });
				return false;
			});
			
		});

    }());

});


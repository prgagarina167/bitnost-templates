"use strict";
$(function () {
  /*$('[data-toggle="popover"]').popover()

  $( ".item" ).mouseleave(function() {
  	if($(this)[0] !== $('.popover').parent()[0]){
  		$('.popover').popover('hide');
  	}
	});*/

/* Collapse Menu */
	$(window).scroll(function(){
		var headerEl = $('header');
		var cartEl = $('.cartBlock');
		var headerHeight = headerEl.height();
		headerEl.css('height', headerHeight+'px');
		if($(window).scrollTop() > headerHeight+300){
			headerEl.addClass('collapsed');
			cartEl.addClass('onCollapsedMenu');
			headerEl.removeClass('hiddenHeader');
		}else if($(window).scrollTop() > headerHeight){
			headerEl.addClass('hiddenHeader');
			cartEl.removeClass('onCollapsedMenu');
			headerEl.removeClass('collapsed');
		}else {
			headerEl.removeClass('collapsed');
			cartEl.removeClass('onCollapsedMenu');
			headerEl.removeClass('hiddenHeader');

		}
	});

//only show one row of Related items
	var oneRowRelated = function(){
		if($('.release').length){
			$( ".release .item" ).each(function() {
	 			$(this).css('display', 'inline-block');
				if($(this).position().top > 0){
		 			$(this).css('display', 'none');
	 			}
			});

		}
	}
	oneRowRelated();

	//ONLY WAY TO ALIGN Title to releases
	var alignReleaseTitle = function(){
		if ( $('.releaseItems .item').length ) {
			var firstItemPos = $('.releaseItems .item').eq(0).position();
			var releasesPos = $('.releases').eq(0).position();
			var titlePosition = releasesPos.left-firstItemPos.left-30;
			$('.releases h3').css('marginLeft', titlePosition+'px');
			$('.filters').css('marginLeft', titlePosition+'px');

		}
	}
	alignReleaseTitle();

	$( window ).resize(function() {
		oneRowRelated();
		alignReleaseTitle();
	});

//animated Cart
	$('body').append('<span id="animatedCart" class="glyphicon glyphicon-shopping-cart"></span>');
	var animatedCart = $('#animatedCart');
	animatedCart.css('position', 'fixed');
	animatedCart.css('display', 'none');
	animatedCart.css('color', '#F95825');

	$(".buyLink").click(function(e){
		e.preventDefault();
		var mainCartPos = $(".cartInfo .glyphicon-shopping-cart").offset();
		var itemCountEl = $('#cartInfoItemCount');
		itemCountEl.text(parseInt(itemCountEl.text())+1);
		var price = parseFloat($(this).find('.price').text());
		var cartVal = $('#cartTotalPrice');
		var newVal = price+ parseFloat(cartVal.text());
		cartVal.text( newVal.toFixed(2) +' €' ); 
		var cart = $(this).find('.glyphicon-shopping-cart')
		var itemCartPos = cart.offset();
		
		animatedCart.offset(itemCartPos);
		animatedCart.css('display', 'block');
		animatedCart.animate({
			top: 0, 
			left: '80%',
			fontSize: '120px',
			opacity: 0
		}, 700, 'swing', function(){
			animatedCart.css('display', 'none');
			animatedCart.css('color', '#F95825');
			animatedCart.css('opacity', 1);
			animatedCart.css('fontSize', '1em');
			animatedCart.css('left', '0');
		});
	});

 //SLIDESHOWS
		var sl = $('.slideshow');
		var controls = sl.find('.slideshowControls');
		var prevBtn = controls.find('.previous');
		var nextBtn = controls.find('.next');
		var items = sl.find('.items img');
		var lastItem =  items.length-1;
		var currentSlide = 0;
		//disable preview on beggining
		controls.find('.previous').addClass('disabled');
		// hide all but first one
		items.not(":eq(0)").addClass('hidden');
		
		nextBtn.on('click', function(e){
			e.preventDefault();
			if(currentSlide < lastItem){
				items.eq(currentSlide).addClass('hidden');
				prevBtn.removeClass('disabled');
				currentSlide += 1;
				items.eq(currentSlide).removeClass('hidden');
			}
			if(currentSlide == lastItem){
				nextBtn.addClass('disabled');
			}
			if(currentSlide != 0){
					prevBtn.removeClass('disabled');
			}
			$('#curImageNr').text(currentSlide+1);
		});
		
		prevBtn.on('click', function(e){
			e.preventDefault();
			if(currentSlide > 0){
				items.eq(currentSlide).addClass('hidden');
				currentSlide -= 1;
				items.eq(currentSlide).removeClass('hidden');
			}
			if(currentSlide == 0){
				prevBtn.addClass('disabled');
			}
			if(currentSlide > 0){
				prevBtn.removeClass('disabled');
			}
			if(currentSlide != lastItem){
				nextBtn.removeClass('disabled');
			}	
			$('#curImageNr').text(currentSlide+1);
		})	
})
"use strict";
$(function () {
  $('[data-toggle="popover"]').popover()

  $( ".item" ).mouseleave(function() {
  	console.log('mouseleft');
  	if($(this)[0] !== $('.popover').parent()[0]){
  		$('.popover').popover('hide');
  	}
	});
})
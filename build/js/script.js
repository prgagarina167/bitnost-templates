"use strict";
$(function () {
  $('[data-toggle="popover"]').popover()

  $( ".item" ).mouseleave(function() {
  	if($(this)[0] !== $('.popover').parent()[0]){
  		$('.popover').popover('hide');
  	}
	});
})
// https://github.com/tongjieme/jquery-animate-scroll-to
var scroll = function($){
	"use strict";
	var defaults = {
			easing: 'swing',
			duration: 1000,
			offset: 0,
			animateAll: false
		};

	var animateAll = function(options){
		var o = $.extend({}, defaults, options || {}),
			THIS = this;

		if(o.animateAll) {
			$("a[href^='#']").on('click', function(e){
				e.preventDefault();
				var target = $(this).attr('href').split('#')[1];

				THIS.to($('#'+target));
			});
		}
		return this;
	};

	var to = function($el, options){
		var o = $.extend({}, defaults, options || {});
		if($el.length) {
			var target_offset = $el.offset(),
	        	target_top = target_offset.top + o.offset;

	        $('html, body').animate({scrollTop:target_top}, o.duration, o.easing);	
		}
		return this;
	};
	return {
		animateAll: animateAll,
		to: to
	};
}(jQuery);
(function ($) {
    
    $.fn.CountUpCircle = function(options){

    	var self = this;
	
	    /**
	    * DEFAULT OPTIONS
	    *
	    * Description
	    *
	    * @param 
	    **/

		var settings = $.extend({
			duration: 5000, //ms
			opacity_anim: false
		}, options);

		var toCount = parseInt(this.html());
		console.log("Count up to: " + toCount);

		var i 	 		 = 0;
		var step 		 = settings.duration / toCount;
		var procent_step = 1/toCount;
		console.log("Step duration: " + step+"ms");

		var displayNumber = function() {
			i++;
			self.html(i);
			if (settings.opacity_anim){
				console.log("animate opacity");
				self.css({'opacity':procent_step*i});
			}
			if (i < toCount) {
				setTimeout(displayNumber, step);
			}
		};

		displayNumber();
	}

}(jQuery));
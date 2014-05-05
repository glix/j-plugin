//Constructor Function
function Slider(option) {
	"use strict";

	var setting = {
		container: ".slider ul", 
		nav: "#slider-nav"
	};
	
	var el = $.extend({}, setting, option);
	this.setVars(el);
	this.init();
}

Slider.prototype = {
	
	setVars: function(el){
		var base = this;
		base.container = $(el.container);
		base.nav = $(el.nav).show();
		base.imgs = this.container.find("img");
		base.imgsLen = this.imgs.length;
		base.imgsWidth = this.imgs.eq(0).width();
	},
	
	init: function () {
	        var base = this;
	        base.nav.find("button").on("click", function () {
		base.setCurrent($(this).data("dir"));
		base.setAnimate();
        });
    },

    setCurrent: function (dir) {

        var pos = this.current;

        var commandTable = {
            next: function () { return pos += ~~ (dir === 'next') },
            prev: function () { return pos += -1 } 
        };

        pos = (isNaN(dir)) ? commandTable[dir]() : dir - 1;

        this.current = (pos < 0) ? this.imgsLen - 1 : pos % this.imgsLen;

    },

    setAnimate: function (coords) {
        this.container.animate({
            "margin-left": coords || -(this.current * this.imgsWidth)
        });
    }

}; // end of prototype

$(function () {
    //object instantiation type
    var slider = new Slider({
	container: ".slider ul",
        nav: "#slider-nav"
    });
});

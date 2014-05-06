/*
 * 	portBox 1.0 - jQuery plugin
 *	written by Joey Navarro	
 *	http://www.joeynavarro.com
 *
 *	Copyright (c) 2013 Joey Navarro (http://www.joeynavarro.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
(function($) {
		

/*------------------------
Listen For Click
-------------------------*/

$(document).on('click', '[data-display]', function(e){
	e.preventDefault();
	var portBoxID = $(this).attr('data-display');
	$('#'+portBoxID).display($(this).data());	

});

/*------------------------
Set Defaults
-------------------------*/

	$.fn.display = function(options) {
	
		var defaults = {
			//Set default animation, can be set to any jQuery UI effect
			//blind, bounce, clip, drop, explode, fade, fold, hilight, puff, pulsate, scale, shake, size, slide, transfer
			animation: 'fade', 
			
			//Set the speed of the animation				   
			animationspeed: 200, 
			
			//click background to close box yea or nay
			closeBGclick: true,
		};
		
		options = $.extend({}, defaults, options); 
		

		
		return this.each(function() {
			
/*------------------------
Globals Are Nice
-------------------------*/	
			
			var portBox = $(this),
				locked = false,
				portBoxBG = $('.portBox-overlay'),
				scrollBar;
				
/*--------------------------
IE Check
---------------------------*/

			var mobileIE = false
			
			if(navigator.userAgent.match(/Windows Phone/i)){
				mobileIE = true;	
			}

/*---------------------------
Animations Locks
----------------------------*/
	
			function unlockPB() { 
				locked = false;
			}
			function lockPB() {
				locked = true;
			}			
/*------------------------
Drop in da BG
-------------------------*/
			
			//If portBox background does not exist add it after portBox
			if(portBoxBG.length == 0) {
				portBoxBG = $('<div class="portBox-overlay" />').insertAfter(portBox);
			}

/*-------------------------
Scroll Bar and Close Button
--------------------------*/   
       
        	//If slimScroll function exists scrollBar equals TRUE
			//Else scrollBar equals FALSE
			if (typeof $.fn.slimScroll == 'function'){
				scrollBar = true;
			}else{
				scrollBar = false;	
			};

			//IF portBox does not have a scroll bar div  and scrollBar is set to TRUE
			if (portBox.has(".scrollBar").length == 0 && scrollBar == true){
				
				//Wrap Everything in the portBox div in a new div with class of scrollBar
				//Add 20 padding on right and set portBox padding to 10 to offset inclusion of scroll bar
				portBox.wrapInner('<div class="scrollBar" style="padding-right:20px;" />'),
				portBox.css({'padding-right' : 10});
				
				//Run the slimScroll function
				$(function(){
					$('.scrollBar').slimScroll({
						height: '100%'
					});
				});	
				
				//Add Close button anchor tag last so it's not traped in slimScroll div
				portBox.append('<a class="close-portBox">&#215;</a>');		
			}
			
			//If no Close button exists add one
			if (portBox.has(".close-portBox").length == 0 && scrollBar == false){
				
				portBox.append('<a class="close-portBox">&#215;</a>');
			}
			
/*------------------------
Keep It In Da Center
-------------------------*/	
			
			portBox.center = function () {
			var top, left;
			
				//If window width is greater than or equal to 1025px 
				//OR box height	is greater than window height 
				//AND scrollBar is TRUE set height to 90%
				 if(portBox.outerHeight() + 25 > $(window).height() && scrollBar === true && mobileIE === false){
					 
					 var maxH = $(window).height() - 80;
					 
					portBox.css({'height' :maxH + 'px'});	 
				}
				
				//Set top an left to 0 <-- seems unnecessary but fixed window offsetting problems when box first appears
				portBox.css({
					top:0, 
					left:0
				});
			
				//Get the windows height minus the portBox height divide it in half
				//Get the windows width minus the portBox width divide it in half
				
				top = Math.max($(window).height() - portBox.outerHeight(), 0) / 2;
				left = Math.max($(window).width() - portBox.outerWidth(), 0) / 2;
				
				//Set top and left values for portBox to center it 
				
				portBox.css({
					top:top + $(window).scrollTop(), 
					left:left + $(window).scrollLeft()
				});
				// If window width greater than or equal to portBox width move close icon inside box 
				//and leave 5px margin on either side of box
				
				if(portBox.innerWidth() + 10 >= $(window).width()){
					portBox.css({'margin-right' : 5 + 'px'}),
					$('.close-portBox').css({'top': 3, 'right': 3});
					
				// Else no margin and position close icon upper right hanging off corner		
				}else{
					portBox.css({'margin-right' : 0 + 'px'}),
					$('.close-portBox').css({'top': -6, 'right': -7});	
				}
				
				//If portBox height is greater than or equal to window height add top of 20 
				if(portBox.outerHeight() >= $(window).height() && scrollBar == false){
					portBox.css({'top' : 20 + $(window).scrollTop()});
				}

			};
			
			//Run the center function
			portBox.center();	
			
			//Run it again as window is resized
			$(window).on('resize.portBox', portBox.center);
			
/*------------------------
Make It Appear 
-------------------------*/ 
			
			//When the portBox opens
			portBox.on('portBox:open', function () {
				
				//If its not locked
				if(!locked) {
					
					//lock It
					lockPB();
					
					//If no animation is set
					if(options.animation == '') {
						
						//Set portBox and background to display block so they just appear 
						portBox.css({'display' : 'block'}),
						portBoxBG.css({'display':'block'});	
						
						//Then unlock the portBox
						unlockPB();				
					}else{
						
						//Else fade in the BG and run animation on portBox
						portBoxBG.fadeIn(options.animationspeed);
						portBox.show(options.animation, options.animationspeed);
						
						//Then unlock portBox
						unlockPB();																				
					}
				}
			});
				
/*------------------------
Make It Go Away
-------------------------*/	
			
			//When portBox is closed
			portBox.on('portBox:close', function () {
				
				//If its not locked
				if(!locked) {
					
					//lock It
					lockPB();
					
					//If no animation is set
					if(options.animation == '') {
						
						//Set portBox and background back to display none  
						portBox.css({'display' : 'none'}),
						portBoxBG.css({'display' : 'none'});
						
						//Then unlock portBox
						unlockPB();	
					}else{
						
						//Else fade out the BG and portBox
						portBoxBG.fadeOut(options.animationspeed),
						portBox.fadeOut(options.animationspeed);
						
						//Then unlock portBox
						unlockPB();				
					} 
					
					//On close turn off the resize handler 
					//triggering the portBox.center function  		
					$(window).off('resize.portBox');	
				}}
			);     

/*-------------------------------
Open and Closing Listeners
--------------------------------*/
			
			//Open 
			portBox.trigger('portBox:open')
			
			//Close
			//Close Button
			var closeButton = $('.close-portBox').one('click.portBoxEvent', function () {
				portBox.trigger('portBox:close')
			});
			//Background Click
			if(options.closeBGclick) {
				portBoxBG.css({'cursor':'pointer'})
				portBoxBG.one('click.portBoxEvent', function () {
				portBox.trigger('portBox:close')
				});
			}
			//Escape Key
			$('body').keyup(function(e) {
				if(e.which===27){ portBox.trigger('portBox:close'); }
			});			
		
		});//end return each function 
	}//end display function
})(jQuery);
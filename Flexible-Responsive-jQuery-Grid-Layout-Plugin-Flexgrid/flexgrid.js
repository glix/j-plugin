(function(jQuery) {
var equalChildren = [], innerChildren, equalParent, videoTypes = 'iframe[src*="youtube"],iframe[src*="vimeo"],object,embed', utils = {};

// Remove white space and text for inline-block's sake
// Solution created by David Hucklesby
// http://codepen.io/hucklesby/pen/sDGaC?editors=011
utils.clean = function(node) {
    var child, i, len = node.childNodes.length;
    if (len === 0) { return; }
    // iterate backwards, as we are removing unwanted nodes
    for (i = len; i > 0; i -= 1) {
        child = node.childNodes[i - 1];
        // comment node? or empty text node
        if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue) )) {
            node.removeChild(child);
        } else {
            if (child.nodeType === 1) {
                utils.clean(child);
            }
        }
    }
};

// Sets grid containers on the same row to equal heights dynamically and responsively
function equalheights() {
    var el, height, marginTop, marginBottom, verticalMargins, tallest = -1, onSameRow = new Array(), onSameRowLength, combinedWidth = 0, equalParentWidth, parentHeight, parentPaddingTop, parentPaddingBottom, verticalPadding, i=0, x=0, y=0, equalChildrenLength = equalChildren.length, innerChildrenLength = innerChildren.length;

    while(i < equalChildrenLength) {
        while (x < equalChildren[i].length) {
            equalChildren[i][x].style.removeProperty('height');
            x++;
        }
        x = 0;
    	i++;
    }
    i = 0;
    while(i < innerChildrenLength) {
    	innerChildren[i].style.removeProperty('height');
    	i++;
    }
    i = 0;

    function setHeights() {
    	onSameRowLength = onSameRow.length;
        // console.log('elementHeight: ' + onSameRow[i].offsetHeight + ' tallest: ' + tallest);
    	while(i < onSameRowLength) {
    		if(onSameRow[i].offsetHeight != tallest) {
    			onSameRow[i].style.height = tallest + 'px';
    		}
    		i++;
    	}    
        tallest = -1; //Reset Height for next row
        onSameRow.length = 0; //Empty array of containers on same row to begin a new row
        combinedWidth = 0;
        i = 0;
    }

    function addToSameRow() {
        onSameRow.push(el); //Add it to the array of containers on the same row
        height = parseInt(el.offsetHeight); // Find current element's height
        tallest = Math.max(tallest, height); //Compare to previous element's height and return the tallest
    }

    while(y < equalChildrenLength) {
        while (x < equalChildren[y].length) {
            el = equalChildren[y][x];
            equalParentWidth = parseInt(el.parentNode.scrollWidth);
            combinedWidth = combinedWidth + el.offsetWidth;
            if(combinedWidth >= (equalParentWidth - 20) && combinedWidth < (equalParentWidth + 20)) { //New Row
                addToSameRow();
                setHeights();
            } else if (combinedWidth >= (equalParentWidth + 20)) { //For instance if you had 7 columns + 9 columns
                setHeights();
                addToSameRow();
                combinedWidth = el.offsetWidth;
            } else {
                addToSameRow();
            }
            x++;
        }
        x = 0;
        setHeights(); // In case the row was unfinished and no more containers need to be measured, setHeights anyways
        y++;
    }
    y = 0;
    // setHeights();
    while(i < innerChildrenLength) {
		marginTop = parseInt(getComputedStyle(innerChildren[i]).getPropertyValue('margin-top'));
		marginBottom = parseInt(getComputedStyle(innerChildren[i]).getPropertyValue('margin-bottom'));
		verticalMargins = marginTop + marginBottom;
		parentPaddingTop = parseInt(getComputedStyle(innerChildren[i].parentNode).getPropertyValue('padding-top'));
		parentPaddingBottom = parseInt(getComputedStyle(innerChildren[i].parentNode).getPropertyValue('padding-bottom'));
		verticalPadding = parentPaddingTop + parentPaddingBottom;
		parentHeight = innerChildren[i].parentNode.clientHeight - verticalPadding;
    	if((innerChildren[i].offsetHeight + verticalMargins) != parentHeight) {
            innerChildren[i].style.height = parentHeight - verticalMargins + 'px';
    	}
    	i++;
    }
    i = 0;
}

//Wraps videos in a responsive wrapper to video's scale evenly
function wrapVideo(container) {
    jQuery(container).each(function() {
        jQuery(this).wrap('<div class="responsive-container"></div>');
    });
}

// Dynamically sets the responsive wrapper to the proportion of the video it contains using the width and height video attributes
function responsiveVideo(container) {
    var height, width, aspectRatio, el, i=0, x=0, containersLength = jQuery(container).length;
    while(i<containersLength) {
        while(x < jQuery(container)[i].children.length) {
            el = jQuery(container)[i].children[x];
            height = el.getAttribute('height');
            width = el.getAttribute('width');
            aspectRatio = (height/width)*100;
            aspectRatio = Math.round(aspectRatio*1000)/1000;
            jQuery(container)[i].style.paddingBottom = aspectRatio + '%';
            x++;
        }
        x = 0;
        i++;
    }
}


jQuery(document).ready(function() {
    // console.time('startup');
    jQuery('body').addClass('js');
    var i = 0, x = 0;
    equalParent = document.getElementsByClassName('equal');
    var gridClasses = new RegExp(/([adtmhc]-[0-9]{1,2})|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|fourty|sixty|eighty|fg/);
    while(i < equalParent.length) {
        // console.log(equalParent[i].children[0]);
        equalChildren.push([]);
        // console.log(equalChildren);
        while(x < equalParent[i].children.length) {
            if(equalParent[i].children[x].className.search(gridClasses) > -1) {
                equalChildren[i].push(equalParent[i].children[x]);
            }
            x++;
        }
        x = 0;
        i++;
    }
    i = 0;
    innerChildren = document.getElementsByClassName('inner');
    utils.clean(document.body);
    wrapVideo(videoTypes);
    responsiveVideo('.responsive-container');
    equalheights();    
    //Enables raw html to go inside pre tags with special characters
    jQuery('pre.show-html').each(function() {
        var preHTML = jQuery(this).html();
        jQuery(this).text(preHTML);
    });
    // console.timeEnd('startup');
});

window.onload = function() {
    equalheights(); 
};

//Slow down page resize function calls
function throttle (func, wait) {
    var throttling = false;
    return function(){
        if ( !throttling ){
            func.apply(this, arguments);
            throttling = true;
            setTimeout(function(){
                throttling = false;
            }, wait);            
        }
    };
}

window.onresize = throttle(function() { 
	// console.time('resize');
	equalheights();
	// console.timeEnd('resize');        
}, 30);
})( jQuery );
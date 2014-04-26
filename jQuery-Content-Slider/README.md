# aslider

> yet another slider plugin for jQuery, but the fact that it supports CSS animations and vertical sliders makes it a  little special.

## Features

* Supports CSS animations as well animating using jQuery i.e. by left or top properties
* Supports vertical (up/down) sliding
* Plays nice with responsive designs - doesn't add any CSS to make the elements responsive but doesn't interfere with it either
* The slider items must not be of the same size. This comes in handy especially for vertical sliders
* provides an API for you to programmatically initiate sliding, among other functions
* No extra CSS is added to the elements, besides one of `transform`, `left` or `top`
* Supports previous/next (up/down) buttons
* Supports keyboard navigation, using the arrow keys

## Installation 

Download and include the plugin code anywhere in your HTML but *after* jQuery, prefferably before the closing `body` tag:

    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="jquery.aslider.min.js"></script>

## Options

* `next: '.next'` - jQuery selector for the next (or down, in the case of a vertical slider) button. Also accepts a jQuery object.
* `prev: '.prev'` - jQuery selector for the previous (or up, in the case of a vertical slider) button. Also accepts a jQuery object.
* `pageHolder: '> ul'` - jQuery selector for the element whose children (or specified by `pageSelector`) are the actual pages. Also accepts a jQuery object
* `pageSelector: null` - jQuery selector which specifies the slider's pages or items. If null, the children of `pageHolder` are assumed to be the pages. This selector is applied in the scope of `pageHolder`
* `itemsPerPage: 1`
* `initialIndex: 0`
* `behaviourAtEdge: 'none'` - allowed: `reset`, `none`. Specifies what to do after the last item has been reached. `reset` takes the slider back to the other edge (beginning or end) while `none` does nothing but if `disabledClass` has been provided it adds this class to the button which is no longer active.
* `disabledClass: 'disabled'` - if `behaviourAtEdge` is `none`, this class is added to the button that is now inactive
* `beforeSlide: null` - a callback to be exectuted before sliding. It receives the index being seeked to as the only parameter. May also be provided after initializing the slider. Within the scope of this function, `this` represents the api (refer to the Methods section for more info).
* `afterSlide: null` - a callback to be exectuted after sliding. It receives the newly current index as the only parameter. May also be provided after initializing the slider. Within the scope of this function, `this` represents the api (refer to the Methods section for more info).
* `animation: true` - whether or not to animate the sliding i.e. use `$().animate` or simply set the CSS property. Note that if `property` is set to `transform` then this is treated as `false`.
* `slideSpeed: 400` - speed for `$().animate`
* `easing: 'swing'` - easing for `$().animate`
* `vertical: false` - up/down or left/right slider?
* `property: 'position'` - allowed: `position` and `transform`. If set to `transform`, the plugin will not animate the sliding at all so combine this with CSS transitions instead
* `keys: false` - whether or not sliders can be controlled by keyboard left and right arrows. If `vertical` is `true`, then up and down arrows are used. Note that the keys will control *all* the sliders on a page, unless some element e.g. a form input has focus. If you have several slider instances and only want to enable keys on one of them then initiate them separately and set `keys` to be `true` only for the one slider.

## Methods

For all these methods, `this` represents the api itself so, for example, you can do `this.getCurrentIndex()` within the `next` function.

#### Control callbacks:

* `afterSlide: function ([callback])` - used to either set a new afterSlide callback or to call the currently set callback, if any 
* `beforeSlide: function ([callback])` - used to either set a new afterSlide callback or to call the currently set callback, if any 

#### Control sliding:

These methods accept an optional callback that is executed after the sliding is finished. Note that even if there's an `afterSlide` callback already set, this callback will be executed instead. Also for this callback, `this` represents the api itself.

* `first: function ([callback])` - slide to the first item
* `last: function ([callback])` - slide to the last item
* `prev: function ([callback])` - slide to the previous item
* `next: function ([callback])` - slide to the next item
* `seek: function (index, [callback])` - slide to a certain index. if index is out of bounds this will do nothing

#### Getters
* `getCurrentIndex: function ()`
* `getOptions: function ()` - returns the options object
* `getPageCount: function ()`
* `getPageHolder: function ()`
* `getPages: function ()`
* `getVersion: function ()` - returns current plugin version

#### Low level
* `off: function ([alsoDisableApiMethods = true])` - turns off the event listeners on the prev, next buttons and disables keyboard keys. If `alsoDisableApiMethods` is `true` (default), this also disables the api methods so that e.g. calling any of the api methods (*except these low-level methods*) won't work. Note that you can call `on` later on to enable the event listeners and api methods.
* `on: function ([alsoEnableApiMethods = true])`  - turns on the event listeners on the prev, next buttons and enables keyboard keys *if* they were previously disabled. If `alsoEnableApiMethods` is `true` (default), this also enables the api methods.
* `isOff: function ()` - whether or not the slider is off
* `isOn: function ()` - whether or not the slider is on
* `methodsDisabled: function ()` - whether or not the api methods are disabled
* `methodsEnabled: function ()` - whether or not the api methods are enabled

## Examples

### Minimal setup

HTML:

```html
<div class="slider">
    <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
    </ul>
</div>
```
    
CSS:

```css
.slider { 
    position: relative; /* 1 */
    overflow: hidden; /* 1 */
}

.slider ul { 
    position: absolute; /* 1 */
    width: 300%; /* 2 */
    list-style: none; /* 3 */
    margin: 0; /* 3 */
    padding: 0; /* 3 */
}

.slider li { 
    float: left; /* 3 */
    width: 33.33%; /* 2 */
}

.slider li:nth-child(odd) { background: #F6F4F0; } /* 3 */
.slider li:nth-child(even) { background: #cdcdcd; } /* 3 */
```

1 - required if not using CSS animations,
2 - make it responsive,
3 - aesthetics
    
JavaScript:

```javascript
$('.slider').aslider();
```

### Keyboard keys support

Building on the minimal setup, update the JS as follows:

```javascript
$('.slider').aslider({
    keys: true
});
```

### Prev/next buttons

Update the HTML and CSS as follows:

HTML:

```html
<div class="slider">
    <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
    </ul>
    <p>
        <!-- since initial index is 0, prev starts off as disabled -->
        <a class="prev disabled" href="#">Prev</a>
        <a class="next" href="#">Next</a>
    </p>
</div>
```

CSS:

```css
.slider p { 
    position: absolute; 
    bottom: 0;
    margin: 0;
    width: 98%; /* 1 */
    padding: 0.5em 1%; /* 1 */
}
.slider .prev { 
    float: left; 
}
.slider .next { 
    float: right; 
}
.slider .disabled { 
    color: silver; 
    cursor: default; 
}
```
1 - makes it responsive, the rest is just aesthetics

JS:

No need to update JS, it'll use the defaults.

### CSS animations

Update the CSS and JS as follows:

CSS:

```css
.slider ul { 
    position: absolute;
    width: 300%;
    list-style: none;
    margin: 0;
    padding: 0;
    -webkit-transition: -webkit-transform 400ms ease-in-out;
    -moz-transition: -moz-transform 400ms ease-in-out; 
    -ms-transition: -ms-transform 400ms ease-in-out; 
    -o-transition: -o-transform 400ms ease-in-out;
    transition: transform 400ms ease-in-out;
}
```

JS:

```javascript
$('.slider').aslider({
    keys: true,
    property: 'transform'
});
```

You can detect broweser capabilities and enable CSS animations accordingly, e.g. using Modernizr:

```javascript
$('.slider').aslider({
    keys: true,
    property: Modernizr.csstransforms ? 'transform' : 'position'
});
```

### Vertical

HTML:

```html
<div class="slider">
    <p>
        <a class="up disabled" href="#">Up</a>
        <a class="down" href="#">Down</a>
    </p>
    <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
    </ul>
</div>
```
    
CSS:

```css
.slider { 
    position: relative; /* 1 */
    overflow: hidden; /* 1 */
    height: 40px;
}

.slider ul { 
    position: absolute; /* 1 */
    list-style: none; /* 3 */
    margin: 0; /* 3 */
    padding: 0; /* 3 */
}

.slider li { 
    height: 40px;
}

.slider li:nth-child(odd) { background: #F6F4F0; } /* 3 */
.slider li:nth-child(even) { background: #cdcdcd; } /* 3 */

.slider p {
    height: auto; /* 3 */
    overflow: hidden; /* 3 */
}

.slider .up { 
    width: 50%; /* 3 */
    display: block; /* 3 */
    float: left; /* 3 */
}
.slider .down { 
    width: 50%; /* 3 */
    display: block; /* 3 */
    float: right; /* 3 */
}
.slider .disabled { 
    color: silver; /* 3 */
    cursor: default; /* 3 */
}
```
1 - required if not using CSS animations,
3 - aesthetics

JS:

```javascript
$('.slider').aslider({
    keys: true,
    property: Modernizr.csstransforms ? 'transform' : 'position',
    vertical: true,
    prev: 'a.up',
    next: 'a.down'
});
```

### Items of varied width or height / beforeSlide

The trick is to use the `beforeSlide` function to update pageSize accordingly. Example with a vertical slider:

HTML:

```html
<div class="slider">
    <p>
        <a class="up disabled" href="#">Up</a>
        <a class="down" href="#">Down</a>
    </p>
    <ul>
        <li style="height: 60px">one</li>
        <li style="height: 100px">two</li>
        <li style="height: 80px">three</li>
    </ul>
</div>
```

```javascript
var slider = $('.slider'),
    initialHeight = slider.height();
slider.aslider({
    keys: true,
    property: Modernizr.csstransforms ? 'transform' : 'position',
    vertical: true,
    prev: 'a.up',
    next: 'a.down',
    beforeSlide: function (index) {
        var pages = this.getPages(),
            next = pages.eq(index),
            height = next.outerHeight();
        if (height < intialHeight) {
            height = initialHeight;
        }
        slider.height(height); // or use $().animate or CSS animations
    }
});
```

## Version - 1.0

Current version: 1.0

## License

[The MIT License](LICENSE.md)

## Contributing

Fork, update and submit a pull request.
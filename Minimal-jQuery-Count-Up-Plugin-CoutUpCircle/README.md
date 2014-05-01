CoutUpCircle
============

jQuery Plugin that counting up

# How to use

The number in the HTML-Elemnt have to stay alone without any unit. Appear the CoutUpCircle Plugin with the following JavaScript Code:
```javascript
$('element').CountUpCircle();
```

## You have following options:
```javascript
$('#count-box').CountUpCircle({
  duration: 2000 /* Integer - Unit: Millisecounds; How long to Count; Default value: 5000  */,
  opacity_anim: true /* Boolean; Raise the Opacity of the element from 0 to 100%; Default: false */
});
```

# Example
This the example, which is available in the demo folder.

```html
<div class="wrapper">
  <div id="count-box">19</div> 
</div>
```
```javascript
$('#count-box').CountUpCircle({
  duration: 2000,
  opacity_anim: true
});
```

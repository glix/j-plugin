# bload.js

### A jQuery plugin for displaying loading animations

## Options
- fadeInSpeed	: The speed the loading screen fades in. (default 300)
- maskOpacity	: Opacity of the mask. (default .4)
- imagePath		: Path to the a difference loading image. (default false)
- imagePadding	: Padding around the loading image. (default 16)
- imageDims		: Width and Height of the image. (default {w:32,h:32})
- fullScreen	: Enables full screen mode. Will center image in window. And overlay will be full screen as well. (default false)
- overlay
	- show		: Show an overlay over the entire area to mask. (default false)
	- color		: Color of the overlay. (default #000)
	- opacity	: Opacity of the overlay (default .2)


## Usage

```javascript
$('elementToMask').bload(options, callback);
```

Example with no options
```javascript
$('#elementToMask').bload(
	function(bload){
	setTimeout(function(){
		bload.hide(); // close animation
	},3000);
});
```

Example based on clicking a button with some options changed
```javascript
$('#button').click(function(e){
	e.preventDefault();
	$('#elementToMask').bload(
		{
			fadeInSpeed		: 600,
			maskOpacity		: .6,
			overlay : {
				show		: true
			}
		},
		function(bload){
			setTimeout(function(){
				bload.hide();
			},3000);

		}
	);
});
```
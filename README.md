sv-hover-intent
=================================================

**sv-hover-intent** is a JavaScript plugin for handling mouse hovers on a delay. It tracks when the mouse movement has slowed enough that it's likely the user *intended* to activate that element.

It's useful for things like dropdown menus, to avoid them popping out if you happen to move past them (for example, when closing the browser tab).

This is essentially a vanilla JavaScript port of the excellent [jQuery-hoverIntent](https://github.com/briancherne/jquery-hoverIntent) plugin by Brian Cherne, though it has been rewritten from the ground up.

## Usage

First add the script to your page like so:

```html
<script src="sv-hover-intent.js"></script>
```

Or add it to your build process.

Call `new SV.HoverIntent` with an array or NodeList of the items you wish to apply it to, and an object containing the options. They are:

- `onEnter` - (required) a callback to execute when hover is activated
- `onExit` - (required) a callback to exexute when the mouse moves off the element
- `exitDelay` - (optional) time in milliseconds to delay the exit function; useful for a dropdown menu if the user overshoots slightly
- `interval` - (optional) polling interval for mouse tracking; only change this if you know what you're doing!
- `sensitivity` - (optional) distance in pixels per `interval`, below which the hover will activate; only change this if you know what you're doing!

```js
// get top-level items from a dropdown menu
var menuItems = document.querySelectorAll('.menu-item');

// set actions for mouse over and mouse leave
var hi = new SV.HoverIntent(menuItems, {
	// required parameters
	onEnter: function(targetItem) {
		targetItem.classList.add('visible');
	},
	onExit: function(targetItem) {
		targetItem.classList.remove('visible');
	},

	// default options
	exitDelay: 400,
	interval: 100,
	sensitivity: 7,
});
```

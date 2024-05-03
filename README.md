SV-HoverIntent
=================================================

**sv-hover-intent-js** is a JavaScript plugin for handling mouse hovers on a delay. It tracks when the mouse movement has slowed enough that it's likely the user *intended* to activate that element.

It's useful for things like dropdown menus, to avoid them popping out if you happen to move past them (for example, when closing the browser tab). See `demo/example.html` for an example. This is essentially a vanilla JavaScript port of the excellent [jQuery-hoverIntent](https://github.com/briancherne/jquery-hoverIntent) plugin by Brian Cherne, though it has been rewritten from the ground up.


## Installation

SV-HoverIntent can be installed via npm:

```sh
npm install sv-hover-intent
```

Then use the file `node_modules/sv-hover-intent/src/sv-hover-intent.js` in your project - either directly in a `<script>` tag, or passing into your bundler/task runner.

Alternatively, you can download or link to a minified version via [jsDelivr](https://www.jsdelivr.com/package/npm/sv-hover-intent).


## Usage

After adding the library script, call `new SV.HoverIntent` with an array or NodeList of the items you wish to apply it to (such as those returned by `document.querySelectorAll`), and an object containing the options. They are:

- `onEnter` - (required) a callback to execute when hover is activated
- `onExit` - (required) a callback to exexute when the mouse moves off the element
- `exitDelay` - (optional) time in milliseconds to delay the exit function; useful for a dropdown menu if the user overshoots slightly
- `interval` - (optional) polling interval for mouse tracking; only change this if you know what you're doing!
- `sensitivity` - (optional) distance in pixels per `interval`, below which the hover will activate; only change this if you know what you're doing!

Here's a simple example, which adds and removes a "visible" class to a menu:

```js
// get top-level items from a dropdown menu
const menuItems = document.querySelectorAll('.menu-item');

// set actions for mouse over and mouse leave
new SV.HoverIntent(menuItems, {
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

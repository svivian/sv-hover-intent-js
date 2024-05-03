// load namespace
SV = window.SV || {};

SV.HoverIntent = (function() {

	// constructor
	return function(elements, userConfig) {

		// private members

		const defaultOptions = {
			exitDelay: 400,
			interval: 100,
			sensitivity: 7,
		};
		let config = {};

		let currX, currY, prevX, prevY;
		let allElems, pollTimer, exitTimer;

		// private methods

		// override default options with user config
		const extend = function(defaults, userArgs) {
			for (let i in userArgs) {
				defaults[i] = userArgs[i];
			}

			return defaults;
		};

		// update mouse position
		const mouseTrack = function(ev) {
			currX = ev.pageX;
			currY = ev.pageY;
		};

		// check if mouse movement has slowed enough to trigger active state
		const mouseCompare = function(targetElem) {
			const distX = prevX - currX, distY = prevY - currY;
			const distance = Math.sqrt(distX*distX + distY*distY);

			if (distance < config.sensitivity) {
				// if we re-entered an element, cancel delayed exit and clear any active elements immediately
				clearTimeout(exitTimer);
				for (let elem of allElems) {
					if (elem.isActive) {
						config.onExit(elem);
						elem.isActive = false;
					}
				}

				// trigger hover
				config.onEnter(targetElem);
				targetElem.isActive = true;
			} else {
				// update previous coordinates and try again later
				prevX = currX;
				prevY = currY;
				pollTimer = setTimeout(function() {
					mouseCompare(targetElem);
				}, config.interval);
			}
		};

		const init = function(elements, userConfig) {
			if (!userConfig || !userConfig.onEnter || !userConfig.onExit) {
				throw 'onEnter and onExit callbacks must be provided';
			}
			config = extend(defaultOptions, userConfig);
			allElems = elements;

			for (let elem of allElems) {
				// holds current element state
				elem.isActive = false;
				// keeps track of mouse position
				elem.addEventListener('mousemove', mouseTrack);

				elem.addEventListener('mouseenter', function(ev) {
					// set initial entry position
					prevX = ev.pageX;
					prevY = ev.pageY;
					// if this element is already active, cancel exit
					if (elem.isActive) {
						clearTimeout(exitTimer);
						return;
					}

					// while mouse is over this element, check distance every 100ms
					pollTimer = setTimeout(function() {
						mouseCompare(elem);
					}, config.interval);
				});
				elem.addEventListener('mouseleave', function(ev) {
					clearTimeout(pollTimer);
					if (!elem.isActive)
						return;

					exitTimer = setTimeout(function() {
						config.onExit(elem);
						elem.isActive = false;
					}, config.exitDelay);
				});
			}
		};

		init(elements, userConfig);
	};

})();

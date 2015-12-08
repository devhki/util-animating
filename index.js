import modernizr from 'modernizr';
import $ from 'jquery';

/*

	Css animation helper

*/

class Animating {
	constructor() {
		this.transitionEndName = this._whichTransitionEvent();
	}

	transition($target, fromCss = {}, toCss = {}, customTransitionRule = 'all 400ms ease-in-out') {

		return new Promise((resolve, reject) => {

			// Animation $target must be jquery object
			if (!($target instanceof $)) {
				$target = $($target);
			}

			// Resolve instantly if css transitions not supported
			if (!modernizr.csstransitions) {
				$target.css(fromCss);
				$target.css(toCss);
				resolve();
				return true;
			}

			// Css animations are supported
			$target
				.css(fromCss);

			setTimeout(() => {
				this._enableTransition($target, customTransitionRule);
				$target
					.css(toCss)
					.one(this.transitionEndName, () => {
						this._disableTransition($target);
						resolve();
					});
			});

		});
	}

	_enableTransition($target, rule = 'all 400ms ease-in-out') {
		$target.css(modernizr.prefixedCSS('transition'), rule);
	}

	_disableTransition($target) {
		$target.css(modernizr.prefixedCSS('transition'), '');
	}

	_whichTransitionEvent() {
		let transEndEventNames = {
				'WebkitTransition': 'webkitTransitionEnd', // Saf 6, Android Browser
				'MozTransition': 'transitionend', // only for FF < 15
				'transition': 'transitionend' // IE10, Opera, Chrome, FF 15+, Saf 7+
			};
		return transEndEventNames[ modernizr.prefixed('transition') ];
	}

}

// Singleton
export default new Animating();

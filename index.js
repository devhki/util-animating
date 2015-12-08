// import modernizr from 'modernizr';
import modernizr from 'Modernizr/Modernizr';
import $ from 'jquery';

/*

	Css animation helper

*/

class Animating {
	constructor() {
		this.transitionEndName = this._whichTransitionEvent();
		this.cssPrefix = this._whichPrefix().css;;
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
			}, 10);

		});
	}

	_enableTransition($target, rule = 'all 400ms ease-in-out') {
		$target.css(this.cssPrefix + 'transition', rule);
	}

	_disableTransition($target) {
		$target.css(this.cssPrefix + 'transition', '');
	}

	_whichTransitionEvent() {
		let transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd', // Saf 6, Android Browser
			'MozTransition': 'transitionend', // only for FF < 15
			'transition': 'transitionend' // IE10, Opera, Chrome, FF 15+, Saf 7+
		};
		return transEndEventNames[modernizr.prefixed('transition')];
	}

	_whichPrefix() {
		// This could be replaced with modernizr.prefixedCSS. As soon as we get modernizr@3.2.0 working with jspm
		let styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
				.call(styles)
				.join('')
				.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	}

}

// Singleton
export default new Animating();

# Animating util

Util for js driven css animations. Relies on jQuery and Modernizr

## Usage

**JS**

```
Animating.transition(
	<jQueryObject>, // jQuery element
	<object|cssFrom>, // { top : 0 }
	<object|cssTo>, // { top : 100 }
	<string|cssTransitionRule|optional> // 'all 400ms ease-in-out'
).then(
	<function|transitionEnd> // Called when transition is done
);
```

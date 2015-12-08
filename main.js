import $ from 'jquery';
import Animating from 'index';

console.log( Animating );

Animating.transition($('p'), {
	// 'background-color' : '#00f'

}, {
	padding : 100,
	'background-color' : '#f00',
	color : '#fff'

}, 'all 2s ease-in-out').then(() => {
	$('body').append('<span>DONE</span>');
});

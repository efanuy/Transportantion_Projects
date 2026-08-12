/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	var bodyEl = document.body,
		content = document.querySelector( '.content-wrap2' ),
		openbtn = document.getElementById( 'set2-button' ),
		closebtn = document.getElementById( 'close-button-cog' ),
		isOpen = false;

	function init() {
		closebtn.style.display = 'none';
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-set2' );
			document.getElementById( 'close-button-cog' ).style.display = 'none';
		}
		else {
			classie.add( bodyEl, 'show-set2' );
			document.getElementById( 'close-button-cog' ).style.display = 'block';
		}
		isOpen = !isOpen;
	}

	init();

})();
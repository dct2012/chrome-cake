'use strict';

function initSearchBar() {
	const searchBar = document.querySelector( '#search' );
	searchBar.addEventListener( 'input', e => {
		console.log( `Search Bar: ${e.target.value}` );
	} );
}

function goChildren( children ) {
	let output = '';
	if ( children ) {
		output = `<ul>`;
		children.forEach( child => {
			output += `<li><a href="${child.url}">${child.title}</a>></li>`;

			output += goChildren( child.children );
		} );
		output += '</ul>';
	}
	return output;
}

function initBookmarks() {
	const bookmarks = document.querySelector( '#bookmarks' );
	let html = '';
	chrome.bookmarks.getTree( results => {
		results.forEach( result => {
			console.log( result );

			html += goChildren( result.children );
		} );
		bookmarks.innerHTML = html;
	} );
}

document.addEventListener( 'DOMContentLoaded', function() {
	initSearchBar();
	initBookmarks();

	const content = document.querySelector( '#content' );
	content.innerHTML = 'Hello';
} );

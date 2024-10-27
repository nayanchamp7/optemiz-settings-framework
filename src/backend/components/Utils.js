/**
 * Update URL parameter.
 *
 * @param {string} param url parameter.
 * @param {string} value parameter value.
 */
export function updateURLParams( param, value ) {
	// Get the current URL
	const url = new URL( window.location );

	if ( value.length === 0 ) {
		url.searchParams.delete( param );
	} else {
		// Update or add the parameter, avoiding duplicates
		if ( url.searchParams.has( param ) ) {
			url.searchParams.set( param, value ); // Update the existing parameter
		} else {
			url.searchParams.append( param, value ); // Add the parameter if not exists
		}
	}

	// Update the browser's URL without refreshing
	window.history.pushState( {}, '', url );
}

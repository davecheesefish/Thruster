define([
    'thruster/utils/classes',
    
    'thruster/utils/noop'
], function(
	classes,
	
	noop
){
	
	/**
	 * A collection of miscellaneous utilities and polyfills.
	 * @namespace
	 * @memberof thruster
	 */
	var utils = {
		// Namespaces
		classes: classes,
		
		// Functions
		noop: noop
	};
	
	return utils;
	
});
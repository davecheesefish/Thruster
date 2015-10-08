require([
    'thruster/input',
    'thruster/math',
    'thruster/shapes',
    'thruster/utils'
], function(
	input,
	thrusterMath, // Avoid conflict with the JS Math object
	shapes,
	utils
){
	"use strict";
	
	// The core object all other functionality is bolted onto
	/**
	 * The top-level namespace for Thruster.js.
	 * @global
	 * @namespace
	 */
	var thruster = {
		/**
		 * The full version number of this build.
		 * @const
		 */
		VERSION: '@VERSION@',
		
		/**
		 * The date this version of Thruster.js was built as the number of seconds since 0000h on 1st January 1970.
		 * @const
		 */
		BUILD_DATE: '@DATE@',
		
		input:  input,
		math:   thrusterMath,
		shapes: shapes,
		utils:  utils
	};
	
	// Export
	window.thruster = thruster;
	
	return thruster;
});
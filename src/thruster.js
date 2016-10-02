require([
    'thruster/content',
    'thruster/graphics',
    'thruster/input',
    'thruster/math',
    'thruster/shapes',
    'thruster/utils'
], function(
	content,
	graphics,
	input,
	math,
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
		
		content:  content,
		graphics: graphics,
		input:    input,
		math:     math,
		shapes:   shapes,
		utils:    utils
	};
	
	// Export
	// If AMD is available, define a module, otherwise create a global object.
	// AMDclean breaks this section, so the following comment forces it to ignore the next line:
	// amdclean
	if (typeof define == 'function' && define.amd){
		// amdclean
		define(function(){
			return thruster;
		});
	} else if (typeof exports !== 'undefined' && module.exports){
		exports = module.exports = thruster;
	} else {
		window.thruster = thruster;
	}
});
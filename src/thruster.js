require([
    'thruster/input',
    'thruster/math',
    'thruster/shapes',
    'thruster/utils'
], function(
	Input,
	ThrusterMath, // Avoid conflict with the JS Math object
	Shapes,
	Utils
){
	"use strict";
	
	// The core object all other functionality is bolted onto
	/**
	 * The top-level namespace for Thruster.js.
	 * @global
	 * @namespace
	 */
	var Thruster = {
		/**
		 * The full version number of this build.
		 * @const
		 */
		version: '@VERSION@',
		
		/**
		 * The date this version of Thruster.js was built as the number of seconds since 0000h on 1st January 1970.
		 * @const
		 */
		buildDate: '@DATE@',
		
		Input: Input,
		Math: ThrusterMath,
		Shapes: Shapes,
		Utils: Utils
	};
	
	// Export
	window.Thruster = Thruster;
	
	return Thruster;
});
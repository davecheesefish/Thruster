require([
    'math',
    'shapes',
    'utils'
], function(
	ThrusterMath, // Avoid conflict with the JS Math object
	Shapes,
	Utils
){
	"use strict";
	
	// The core object all other functionality is bolted onto
	var Thruster = {
		version: '@VERSION@',
		build_date: '@DATE@',
		
		Math: ThrusterMath,
		Shapes: Shapes,
		Utils: Utils
	};
	
	// Export
	window.Thruster = Thruster;
	
	return Thruster;
});
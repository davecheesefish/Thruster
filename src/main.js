require([
    'math',
    'shapes'
], function(
	ThrusterMath, // Avoid conflict with the JS Math object
	Shapes
){
	"use strict";
	
	// The core object all other functionality is bolted onto
	var Thruster = {
		version: '@VERSION@',
		build_date: '@DATE@',
		
		Math: ThrusterMath,
		Shapes: Shapes
	};
	
	// Export
	window.Thruster = Thruster;
	
	return Thruster;
});
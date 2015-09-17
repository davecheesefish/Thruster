require([
    'math'
], function(
	ThrusterMath // Avoid conflict with the JS Math object
){
	"use strict";
	
	// The core object all other functionality is bolted onto
	var Thruster = {
		version: '@VERSION@',
		build_date: '@DATE@',
		
		Math: ThrusterMath
	};
	
	// Export
	window.Thruster = Thruster;
	
	return Thruster;
});
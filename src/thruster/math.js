define([
    'thruster/math/vector2d',
    
    'thruster/math/lerp'
], /** @lends math */ function(
	Vector2d,
	
	lerp
){
	
	/**
	 * @namespace
	 * @memberof thruster
	 */
	var math = {
		// Classes
		Vector2d: Vector2d,
			
		// Functions
		lerp: lerp
	};
	
	return math;
	
});
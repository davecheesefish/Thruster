define([
    'thruster/math/matrix',
    'thruster/math/vector2d',
    
    'thruster/math/lerp'
], function(
	Matrix,
	Vector2d,
	
	lerp
){
	
	/**
	 * @namespace
	 * @memberof thruster
	 */
	var math = {
		// Classes
		Matrix: Matrix,
		Vector2d: Vector2d,
			
		// Functions
		lerp: lerp
	};
	
	return math;
	
});
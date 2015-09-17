define(function(){
	
	var Vector2d = function(x, y){
		this.x = x;
		this.y = y;
	};
	
	
	// Public functions
	
	/**
	 * Creates a new Vector2d with the same x and y values.
	 * @returns {Thruster.Math.Vector2d}
	 */
	Vector2d.prototype.clone = function(){
		return new Vector2d(this.x, this.y);
	};
	
	/**
	 * Calculates the length of this vector.
	 * @returns {Number}
	 */
	Vector2d.prototype.length = function(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	};
	
	/**
	 * Calculates the angle of this vector from the positive x axis.
	 * @returns {Number}
	 */
	Vector2d.prototype.angle = function(){
		return Math.atan2(this.y, this.x);
	};
	
	
	// Static functions
	/**
	 * Create a new Vector2d from an angle (from the positive x axis) and length.
	 * @returns {Thruster.Math.Vector2d}
	 */
	Vector2d.fromComponents = function(angle, length){
		return new Vector2d(length * Math.cos(angle), length * Math.sin(angle));
	};
	
	
	return Vector2d;
	
});
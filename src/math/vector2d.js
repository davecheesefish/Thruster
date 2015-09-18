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
	 * Add another vector to this one.
	 * @param {Thruster.Math.Vector2d} vector The vector to add.
	 * @returns {Thruster.Math.Vector2d} This vector, to allow chaining.
	 */
	Vector2d.prototype.add = function(vector){
		this.x += vector.x;
		this.y += vector.y;
		return this;
	};
	
	/**
	 * Returns the angle of this vector from the positive x axis.
	 * @returns {Number}
	 */
	Vector2d.prototype.angle = function(){
		return Math.atan2(this.y, this.x);
	};
	
	/**
	 * Returns the dot product of this vector with the other vector provided.
	 * @param {Thruster.Math.Vector2d} vector The other vector.
	 * @returns {Number}
	 */
	Vector2d.prototype.dot = function(vector){
		return (this.x * vector.x) + (this.y * vector.y);
	};
	
	/**
	 * Returns the length of this vector.
	 * @returns {Number}
	 */
	Vector2d.prototype.length = function(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	};
	
	/**
	 * Modifies this vector to have length of 1, while preserving direction.
	 * @returns {Thruster.Math.Vector2d} This vector, to allow chaining.
	 */
	Vector2d.prototype.normalize = function(){
		var len = this.length();
		this.x /= len;
		this.y /= len;
		
		return this;
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
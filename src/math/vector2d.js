define(function(){
	
	var Vector2d = function(x, y){
		this.x = x;
		this.y = y;
	};
	
	/**
	 * Calculates the length of this vector.
	 * @returns The length of the vector.
	 */
	Vector2d.prototype.length = function(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	};
	
	/**
	 * Calculates the angle of this vector from the positive x axis.
	 * @returns The angle of this vector from the positive x axis.
	 */
	Vector2d.prototype.angle = function(){
		return Math.atan2(this.y, this.x);
	}
	
	return Vector2d;
	
});
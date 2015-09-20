define(['math/vector2d'], function(Vector2d){
	
	/**
	 * Class representing a point in 2-dimensional Euclidean space.
	 * @constructor
	 * @param {Number} x
	 * @param {Number} y
	 */
	var Point2d = function(x, y){
		this.x = x;
		this.y = y;
	};
	
	/**
	 * Returns a new Point2d with the same x and y values.
	 * @returns {Thruster.Math.Vector2d}
	 */
	Point2d.prototype.clone = function(){
		return new Point2d(this.x, this.y);
	};
	
	/**
	 * Get the vector from this point to the other point provided.
	 * @param {Thruster.Shapes.Point} point The target point.
	 * @returns {Thruster.Math.Vector2d}
	 */
	Point2d.prototype.vectorTo = function(point){
		return new Vector2d(point.x - this.x, point.y - this.y);
	};
	
	/**
	 * Translates this point by the given values.
	 * @param {Number} x Translation along the x axis.
	 * @param {Number} y Translation along the y axis.
	 * @returns {Thruster.Shapes.Point2d} This point, to allow chaining.
	 */
	Point2d.prototype.translate = function(x, y){
		this.x += x;
		this.y += y;
		
		return this;
	};
	
	/**
	 * Translates this point by the given vector.
	 * @param {Thruster.Math.Vector2d} vector
	 * @returns {Thruster.Shapes.Point2d} This point, to allow chaining.
	 */
	Point2d.prototype.translateByVector = function(vector){
		this.x += vector.x;
		this.y += vector.y;
		
		return this;
	};
	
	return Point2d;
	
});
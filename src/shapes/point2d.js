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
	 * Get the vector from this point to the other point provided.
	 * @param {Thruster.Shapes.Point} point The target point.
	 * @returns {Thruster.Math.Vector2d}
	 */
	Point2d.prototype.vectorTo = function(point){
		return new Vector2d(point.x - this.x, point.y - this.y);
	};
	
	return Point2d;
	
});
define(['math/vector2d'], /** @lends Vector2d */ function(Vector2d){
	
	/**
	 * A point in 2-dimensional Euclidean space.
	 * @class
	 * @memberof Thruster.Shapes
	 * @param {Number} x
	 * @param {Number} y
	 */
	var Point2d = function(x, y){
		/**
		 * X position of this point.
		 */
		this.x = x;
		
		/**
		 * Y position of this point.
		 */
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
	 * Returns the angle from this point to the other point provided.
	 * @param {Thruster.Shapes.Point2d} point
	 * @returns {Number}
	 */
	Point2d.prototype.angleTo = function(point){
		return Math.atan2(point.y - this.y, point.x - this.x);
	};
	
	/**
	 * Returns the distance from this point to the other point provided.
	 * @param {Thruster.Shapes.Point2d} point The other point.
	 * @returns {Number}
	 */
	Point2d.prototype.distanceTo = function(point){
		return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
	};
	
	/**
	 * Rotates this point about the origin by the given angle.
	 * @param {Number} angle The angle to rotate through in radians from the positive x axis.
	 * @returns {Thruster.Shapes.Point2d} This point, to allow chaining.
	 */
	Point2d.prototype.rotateAboutOrigin = function(angle){
		var c = Math.cos(angle),
			s = Math.sin(angle),
			newX = this.x * c - this.y * s,
			newY = this.x * s + this.y * c;
	
		this.x = newX;
		this.y = newY;
	
		return this;
	};
	
	/**
	 * Returns a new vector using the component values of this point.
	 * @returns {Thruster.Math.Vector2d}
	 */
	Point2d.prototype.toVector = function(){
		return new Vector2d(this.x, this.y);
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
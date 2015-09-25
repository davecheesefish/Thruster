define(['shapes/point2d'], /** @lends Circle */ function(Point2d){
	
	/**
	 * @class
	 * @memberof Thruster.Shapes
	 */
	var Circle = function(radius){
		/**
		 * Radius of the circle.
		 */
		this.radius = radius;
	};
	
	/**
	 * Returns the circumerence of this circle.
	 * @returns {Number}
	 */
	Circle.prototype.perimeter = function(){
		return 2 * Math.PI * this.radius;
	};
	
	/**
	 * Returns the area of this circle.
	 * @returns {Number}
	 */
	Circle.prototype.area = function(){
		return Math.PI * Math.pow(this.radius, 2);
	};
	
	return Circle;
	
});
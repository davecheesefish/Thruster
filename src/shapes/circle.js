define(['shapes/point2d'], function(Point2d){
	
	var Circle = function(radius){
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
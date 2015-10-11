define(function(){
	
	/**
	 * Check for collision between a point and a circle.
	 * @public
	 * @memberof thruster.shapes.collision
	 * @param {thruster.shapes.Point2d} point
	 * @param {thruster.shapes.Circle} circle
	 * @param {thruster.shapes.Point2d} circlePos Position of the center of the circle.
	 * @returns {Boolean} True if the point and circle collide, false if not.
	 */
	var pointCollidesCircle = function(point, circle, circlePos){
		return point.distanceTo(circlePos) <= circle.radius;
	};
	
	return pointCollidesCircle;
	
});
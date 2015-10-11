define(function(){
	
	/**
	 * Check for collision between two circles.
	 * @public
	 * @memberof thruster.shapes.collision
	 * @param {thruster.shapes.Circle} circle1
	 * @param {thruster.shapes.Point2d} circle1Pos Center position of the first circle.
	 * @param {thruster.shapes.Circle} circle2
	 * @param {thruster.shapes.Point2d} circle2Pos Center position of the second circle.
	 * @returns {Boolean} True if the circles collide, false if not.
	 */
	var circlesCollide = function(circle1, circle1Pos, circle2, circle2Pos){
		return circle1Pos.distanceTo(circle2Pos) <= circle1.radius + circle2.radius;
	};
	
	return circlesCollide;
	
});
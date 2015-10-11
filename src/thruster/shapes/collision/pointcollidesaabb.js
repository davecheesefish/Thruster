define(function(){
	
	/**
	 * Check for collision between an axis-aligned bounding box and a point.
	 * @public
	 * @memberof thruster.shapes.collision
	 * @param {thruster.shapes.Point2d} point
	 * @param {thruster.shapes.Aabb}    aabb
	 * @param {thruster.shapes.Point2d} aabbPosition Position of the bounding box.
	 * @returns {Boolean} True if the point and bounding box collide, false if not.
	 */
	var pointCollidesAabb= function(point, aabb, aabbPosition){
		return aabb.collidesWithPoint(aabbPosition, point);
	};
	
	return pointCollidesAabb;
	
});
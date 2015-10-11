define(function(){
	
	/**
	 * Check for collision between two axis-aligned bounding boxes.
	 * @public
	 * @memberof thruster.shapes.collision
	 * @param {thruster.shapes.Aabb} aabb1 The first bounding box.
	 * @param {thruster.shapes.Point2d} position1 The position of the first bounding box.
	 * @param {thruster.shapes.Aabb} aabb2 The second bounding box.
	 * @param {thruster.shapes.Point2d} position2 The position of the second bounding box.
	 * @returns {Boolean} True if the bounding boxes collide, false if not.
	 */
	var aabbsCollide = function(aabb1, position1, aabb2, position2){
		return aabb1.collidesWithAabb(position1, aabb2, position2);
	};
	
	return aabbsCollide;
	
});
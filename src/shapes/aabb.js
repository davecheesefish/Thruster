define(/** @lends Aabb */ function(){
	
	/**
	 * Axis-aligned bounding box. Collision checking is more efficient than on a Rectangle, but AABBs cannot be rotated.
	 * @class
	 * @memberof Thruster.Shapes
	 * @param {Number} width
	 * @param {Number} height
	 */
	var Aabb = function(width, height){
		this.width = width || 1;
		this.height = height || 1;
	};
	
	/**
	 * Checks for collision with another AABB.
	 * @param {Thruster.Shapes.Point2d} position The position of this AABB.
	 * @param {Thruster.Shapes.Aabb} aabb The other AABB to check collision with.
	 * @param {Thruster.Shapes.Point2d} aabbPosition The position of the other AABB.
	 * @returns {Boolean} True if the bounding boxes are in collision, false if not.
	 */
	Aabb.prototype.collidesWithAabb = function(position, aabb, aabbPosition){
		return (
			position.x <= aabbPosition.x + aabb.width &&
			position.x + this.width >= aabbPosition.x &&
			position.y <= aabbPosition.y + aabb.height &&
			position.y + this.height >= aabbPosition.y
		);
	};
	
	/**
	 * Checks for collision with a point.
	 * @param {Thruster.Shapes.Point2d} position Position of this bounding box.
	 * @param {Thruster.Shapes.Point2d} point
	 * @returns {Boolean} True if this bounding box collides with the point, false if not.
	 */
	Aabb.prototype.collidesWithPoint = function(position, point){
		return (
			point.x >= position.x &&
			point.x <= position.x + this.width &&
			point.y >= position.y &&
			point.y <= position.y + this.height
		);
	};
	
	return Aabb;
	
});
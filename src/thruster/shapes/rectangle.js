define([
    'thruster/shapes/polygon',
    'thruster/shapes/point2d',
    'thruster/math/vector2d',
    'thruster/utils/classes'
], /** @lends Rectangle */ function(
	Polygon,
	Point2d,
	Vector2d,
	classes
){
	
	/**
	 * A rectangle, usually used for bounding boxes. If this shape will be used as a collision object and rotation is not required,
	 * an {@link thruster.shapes.Aabb axis-aligned bounding box} will be more efficient.
	 * @class
	 * @memberof thruster.shapes
	 * @extends thruster.shapes.polygon
	 * @param {Number} width Width of the rectangle.
	 * @param {Number} height Height of the rectangle.
	 * @param {Number} [angle=0] Angle of the rectangle relative to the positive X-axis.
	 * @param {Number} [originX=0] X position of the origin for transformations (including rotation), relative to the top-left corner.
	 * @param {Number} [originY=0] Y position of the origin for transformations (including rotation), relative to the top-left corner.
	 */
	var Rectangle = function(width, height, originX, originY){
		this.constructVertices(width || 1, height || 1, originX || 0, originY || 0);
	};
	
	// Extends thruster.shapes.Polygon
	classes.extend(Polygon, Rectangle);
	
	Rectangle.prototype.constructVertices = function(width, height, originX, originY){
		var offset = new Vector2d(-originX, -originY);
		
		var vertices = [
            new Point2d(0, 0).translateByVector(offset),
            new Point2d(width, 0).translateByVector(offset),
            new Point2d(width, height).translateByVector(offset),
            new Point2d(0, height).translateByVector(offset)
        ];
		
		this.setVertices(vertices);
	};
	
	return Rectangle;
	
});
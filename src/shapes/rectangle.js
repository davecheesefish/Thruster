define(['shapes/polygon', 'shapes/point2d', 'math/vector2d', 'utils/classes'], function(Polygon, Point2d, Vector2d, Classes){
	
	/**
	 * A rectangle, usually used for bounding boxes.
	 * @constructor
	 * @param {Number} width Width of the rectangle.
	 * @param {Number} height Height of the rectangle.
	 * @param {Number} [angle] Angle of the rectangle relative to the positive X-axis.
	 * @param {Number} [originX] X position of the origin for transformations (including rotation), relative to the top-left corner.
	 * @param {Number} [originY] Y position of the origin for transformations (including rotation), relative to the top-left corner.
	 */
	var Rectangle = function(width, height, originX, originY){
		this.constructVertices(width || 1, height || 1, originX || 0, originY || 0);
	};
	
	// Extends Thruster.Shapes.Polygon
	Classes.extend(Polygon, Rectangle);
	
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
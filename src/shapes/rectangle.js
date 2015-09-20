define(['shapes/point2d', 'math/vector2d'], function(Point2d, Vector2d){
	
	/**
	 * A rectangle, usually used for bounding boxes.
	 * @constructor
	 * @param {Number} x X position.
	 * @param {Number} y Y position.
	 * @param {Number} width Width of the rectangle.
	 * @param {Number} height Height of the rectangle.
	 * @param {Number} [angle] Angle of the rectangle relative to the positive X-axis.
	 * @param {Number} [originX] X position of the origin for transformations (including rotation), relative to the top-left corner.
	 * @param {Number} [originY] Y position of the origin for transformations (including rotation), relative to the top-left corner.
	 */
	var Rectangle = function(x, y, width, height, angle, originX, originY){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.angle = angle || 0;
		this.origin = new Point2d(originX || 0, originY || 0);
	};
	
	Rectangle.prototype.getVertices = function(){
		var vertices;
		
		// No rotation, do it the easy way.
		if (this.angle === 0) {
			vertices = [
	            new Point2d(this.x - this.origin.x, this.y - this.origin.y),
	            new Point2d(this.x + (this.width - this.origin.x), this.y - this.origin.y),
	            new Point2d(this.x + (this.width - this.origin.x), this.y + (this.height - this.origin.y)),
	            new Point2d(this.x - this.origin.x, this.y + (this.height - this.origin.y))
			];
		} else {
			// Rectangle is rotated.
			// Get actual position of the origin point.
			var originPos = new Point2d(this.x + this.origin.x, this.y + this.origin.y);
			
			vertices = [
	            originPos.clone().translateByVector(new Vector2d(-this.origin.x, -this.origin.y).rotate(this.angle)),
	            originPos.clone().translateByVector(new Vector2d(this.width - this.origin.x, -this.origin.y).rotate(this.angle)),
	            originPos.clone().translateByVector(new Vector2d(this.width - this.origin.x, this.height - this.origin.y).rotate(this.angle)),
	            originPos.clone().translateByVector(new Vector2d(-this.origin.x, this.height - this.origin.y).rotate(this.angle))
			];
		}
		
		return vertices;
	};
	
	return Rectangle;
	
});
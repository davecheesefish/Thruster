define(function(){
	
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
		this.originX = originX || 0;
		this.originY = originY || 0;
	};
	
	return Rectangle;
	
});
define([
    'thruster/shapes/collision',
    'thruster/shapes/aabb',
    'thruster/shapes/circle',
    'thruster/shapes/point2d',
    'thruster/shapes/polygon',
    'thruster/shapes/rectangle'
], /** @lends Shapes */ function(
	Collision,
	Aabb,
	Circle,
	Point2d,
	Polygon,
	Rectangle
){
	
	/**
	 * @namespace
	 * @memberof Thruster
	 */
	var Shapes = {
		Collision: Collision,
		
		Aabb: Aabb,
		Circle: Circle,
		Point2d: Point2d,
		Polygon: Polygon,
		Rectangle: Rectangle
	};
	
	return Shapes;
	
});
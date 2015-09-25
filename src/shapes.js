define([
    'shapes/collision',
    'shapes/aabb',
    'shapes/circle',
    'shapes/point2d',
    'shapes/polygon',
    'shapes/rectangle'
], function(
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
define([
    'thruster/shapes/collision',
    
    'thruster/shapes/aabb',
    'thruster/shapes/circle',
    'thruster/shapes/point2d',
    'thruster/shapes/polygon',
    'thruster/shapes/rectangle'
], function(
	collision,
	
	Aabb,
	Circle,
	Point2d,
	Polygon,
	Rectangle
){
	
	/**
	 * @namespace
	 * @memberof thruster
	 */
	var shapes = {
		collision: collision,
		
		Aabb: Aabb,
		Circle: Circle,
		Point2d: Point2d,
		Polygon: Polygon,
		Rectangle: Rectangle
	};
	
	return shapes;
	
});
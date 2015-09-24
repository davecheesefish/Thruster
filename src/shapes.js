define(['shapes/collision', 'shapes/circle', 'shapes/point2d', 'shapes/polygon', 'shapes/rectangle'], function(Collision, Circle, Point2d, Polygon, Rectangle){
	
	var Shapes = {
		Collision: Collision,
		
		Circle: Circle,
		Point2d: Point2d,
		Polygon: Polygon,
		Rectangle: Rectangle
	};
	
	return Shapes;
	
});
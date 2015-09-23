define(['shapes/collision', 'shapes/point2d', 'shapes/polygon', 'shapes/rectangle'], function(Collision, Point2d, Polygon, Rectangle){
	
	var Shapes = {
		Collision: Collision,
		Point2d: Point2d,
		Polygon: Polygon,
		Rectangle: Rectangle
	};
	
	return Shapes;
	
});
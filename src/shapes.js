define(['shapes/point2d', 'shapes/polygon', 'shapes/rectangle'], function(Point2d, Polygon, Rectangle){
	
	var Shapes = {
		Point2d: Point2d,
		Polygon: Polygon,
		Rectangle: Rectangle
	};
	
	return Shapes;
	
});
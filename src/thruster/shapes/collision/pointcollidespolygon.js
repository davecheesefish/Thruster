define(function(){
	
	/**
	 * Check for collision between a point and a convex polygon.
	 * @public
	 * @memberof thruster.shapes.collision
	 * @param {thruster.shapes.Point2d} point
	 * @param {thruster.shapes.Polygon} polygon
	 * @param {thruster.shapes.Point2d} polygonPosition The position of the polygon.
	 * @param {Number} polygonAngle The rotation angle of the polygon.
	 * @returns {Boolean} True if the point and polygon collide, false if not.
	 */
	var pointCollidesPolygon = function(point, polygon, polygonPosition, polygonAngle){
		var vertices = polygon.getVertices(polygonPosition, polygonAngle),
			normals = polygon.getNormals(polygonAngle),
			collision = true,
			polyLow = null,
			polyHigh = null,
			projectedPoint, projectedVertex;
		
		// Project all points onto the polygon's normals. If the projected point lies outside
		// the projected vertices on any normal, the two aren't in collision.
		for (var nIndex in normals){
			projectedPoint = point.toVector().scalarProjection(normals[nIndex]);
			
			for (var vIndex in vertices){
				projectedVertex = vertices[vIndex].toVector().scalarProjection(normals[nIndex]);
				
				if (polyLow === null || projectedVertex < polyLow){ polyLow = projectedVertex; }
				if (polyHigh === null || projectedVertex > polyHigh){ polyHigh = projectedVertex; }
			}
			
			if (polyLow > projectedPoint || polyHigh < projectedPoint){
				collision = false;
				break;
			}
		}
		
		return collision;
	};
	
	return pointCollidesPolygon;
	
});
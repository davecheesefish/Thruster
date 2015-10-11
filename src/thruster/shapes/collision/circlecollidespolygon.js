define(function(){
	
	/**
	 * Check for collision between a circle and a polygon.
	 * @public
	 * @memberof thruster.shapes.collision
	 * @param {thruster.shapes.Circle} circle
	 * @param {thruster.shapes.Point2d} circlePosition Center position of the circle.
	 * @param {thruster.shapes.Polygon} polygon
	 * @param {thruster.shapes.Point2d} circlePosition Position of the polygon.
	 * @param {Number} polygonAngle The rotation angle of the polygon.
	 */
	var circleCollidesPolygon = function(circle, circlePosition, polygon, polygonPosition, polygonAngle){
		var vertices = polygon.getVertices(polygonPosition, polygonAngle),
			projectionAxes = polygon.getNormals(polygonAngle);
		
		// Find closest vertex to circle's center point
		var closestDist = null,
			closestVertex,
			dist;
		for (var i in vertices){
			dist = circlePosition.distanceTo(vertices[i]);
			if (closestDist === null || dist < closestDist){
				closestVertex = vertices[i];
				closestDist = dist;
			}
		}
		
		// Add vector (from circle center point to closest vertex) to list of projection axes.
		projectionAxes.push(circlePosition.vectorTo(closestVertex));
		
		// Use modified separating axis theory to detect collisions.
		var collision = true,
			polyLow = null,
			polyHigh = null,
			circleLow = null,
			circleHigh = null,
			projectedVertex,
			projectedCircleCenter,
			axis;
		for (var axisIndex in projectionAxes){
			axis = projectionAxes[axisIndex];
			
			projectedCircleCenter = circlePosition.toVector().scalarProjection(axis);
			circleLow = projectedCircleCenter - circle.radius;
			circleHigh = projectedCircleCenter + circle.radius;
			
			for (var vertexIndex in vertices){
				projectedVertex = vertices[vertexIndex].toVector().scalarProjection(axis);
				
				if (polyLow === null || projectedVertex < polyLow){ polyLow = projectedVertex; }
				if (polyHigh === null || projectedVertex > polyHigh){ polyHigh = projectedVertex; }
			}
			
			if (circleHigh < polyLow || circleLow > polyHigh){
				collision = false;
				break;
			}
		}
		
		return collision;
	};
	
	return circleCollidesPolygon;
	
});
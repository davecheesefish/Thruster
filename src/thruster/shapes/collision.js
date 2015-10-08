define(/** @lends Collision */ function(){
	
	/**
	 * @namespace
	 * @memberof Thruster.Shapes
	 */
	var Collision = {
		/**
		 * Check for collision between two axis-aligned bounding boxes.
		 * @param {Thruster.Shapes.Aabb} aabb1 The first bounding box.
		 * @param {Thruster.Shapes.Point2d} position1 The position of the first bounding box.
		 * @param {Thruster.Shapes.Aabb} aabb2 The second bounding box.
		 * @param {Thruster.Shapes.Point2d} position2 The position of the second bounding box.
		 * @returns {Boolean} True if the bounding boxes collide, false if not.
		 */
		aabbWithAabb: function(aabb1, position1, aabb2, position2){
			return aabb1.collidesWithAabb(position1, aabb2, position2);
		},
		
		/**
		 * Check for collision between an axis-aligned bounding box and a point.
		 * @param {Thruster.Shapes.Aabb} aabb
		 * @param {Thruster.Shapes.Point2d} aabbPosition Position of the bounding box.
		 * @param {Thruster.Shapes.Point2d} point
		 * @returns {Boolean} True if the bounding box and point collide, false if not.
		 */
		aabbWithPoint: function(aabb, aabbPosition, point){
			return aabb.collidesWithPoint(aabbPosition, point);
		},
		
		/**
		 * Check for collision between two circles.
		 * @param {Thruster.Shapes.Circle} circle1
		 * @param {Thruster.Shapes.Point2d} circle1Pos Center position of the first circle.
		 * @param {Thruster.Shapes.Circle} circle2
		 * @param {Thruster.Shapes.Point2d} circle2Pos Center position of the second circle.
		 * @returns {Boolean} True if the circles collide, false if not.
		 */
		circleWithCircle: function(circle1, circle1Pos, circle2, circle2Pos){
			return circle1Pos.distanceTo(circle2Pos) <= circle1.radius + circle2.radius;
		},
		
		/**
		 * Check for collision between a circle and a polygon.
		 * @param {Thruster.Shapes.Circle} circle
		 * @param {Thruster.Shapes.Point2d} circlePosition Center position of the circle.
		 * @param {Thruster.Shapes.Polygon} polygon
		 * @param {Thruster.Shapes.Point2d} circlePosition Position of the polygon.
		 * @param {Number} polygonAngle The rotation angle of the polygon.
		 */
		circleWithPolygon: function(circle, circlePosition, polygon, polygonPosition, polygonAngle){
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
			
			// Add vector (from circle centerpoint to closest vertex) to list of projection axes.
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
		},
		
		/**
		 * Check for collision between a point and a circle.
		 * @param {Thruster.Shapes.Point2d} point
		 * @param {Thruster.Shapes.Circle} circle
		 * @param {Thruster.Shapes.Point2d} circlePos Position of the center of the circle.
		 * @returns {Boolean} True if the point and circle collide, false if not.
		 */
		pointWithCircle: function(point, circle, circlePos){
			return point.distanceTo(circlePos) <= circle.radius;
		},
		
		/**
		 * Check for collision between a point and a convex polygon.
		 * @param {Thruster.Shapes.Point2d} point
		 * @param {Thruster.Shapes.Polygon} polygon
		 * @param {Thruster.Shapes.Point2d} polygonPosition The position of the polygon.
		 * @param {Number} polygonAngle The rotation angle of the polygon.
		 * @returns {Boolean} True if the point and polygon collide, false if not.
		 */
		pointWithPolygon: function(point, polygon, polygonPosition, polygonAngle){
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
		},
	
		/**
		 * Check for collision between two convex polygons.
		 * @param {Thruster.Shapes.Polygon} polygon1 The first shape.
		 * @param {Thruster.Shapes.Point2d} p1Position Position of the first shape.
		 * @param {Number} p1Angle Angle of the first shape, in radians from the positive x axis.
		 * @param {Thruster.Shapes.Polygon} polygon2 The second shape.
		 * @param {Thruster.Shapes.Point2d} p2Position Position of the second shape.
		 * @param {Number} p2Angle Angle of the second shape, in radians from the positive x axis.
		 * @returns {Boolean} True if the shapes collide, false if not.
		 */
		polygonWithPolygon: function(polygon1, p1Position, p1Angle, polygon2, p2Position, p2Angle){
			// Use the separating axis theorem to detect any gaps between the shapes.
			var p1v = polygon1.getVertices(p1Position, p1Angle),
				p1n = polygon1.getNormals(p1Angle),
				p2v = polygon2.getVertices(p2Position, p2Angle),
				p2n = polygon2.getNormals(p2Angle);
			
			var normals = p1n.concat(p2n),
				normal, projection, p1Low, p1High, p2Low, p2High,
				collision = true;
			
			for (var nIndex in normals){
				normal = normals[nIndex];
				// Set all thresholds to null.
				p1Low = p1High = p2Low = p2High = null;
				
				for (var vIndex in p1v){
					projection = p1v[vIndex].toVector().scalarProjection(normal);
					
					if (p1Low === null || projection < p1Low){ p1Low = projection; }
					if (p1High === null || projection > p1High){ p1High = projection; }
				}
				
				for (var vIndex in p2v){
					projection = p2v[vIndex].toVector().scalarProjection(normal);
					
					if (p2Low === null || projection < p2Low){ p2Low = projection; }
					if (p2High === null || projection > p2High){ p2High = projection; }
				}
				
				if (p1High < p2Low || p1Low > p2High){
					collision = false;
					break;
				}
			}
			
			return collision;
		}
	};
	
	return Collision;
	
});
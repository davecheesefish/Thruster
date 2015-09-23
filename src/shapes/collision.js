define(['shapes/polygon'], function(Polygon){
	
	var Collision = {
		/**
		 * Check for collision between two polygons.
		 * @param {Thruster.Shapes.Polygon} polygon1 The first shape.
		 * @param {Thruster.Shapes.Point2d} p1Position Position of the first shape.
		 * @param {Number} p1Angle Angle of the first shape, in radians from the positive x axis.
		 * @param {Thruster.Shapes.Polygon} polygon2 The second shape.
		 * @param {Thruster.Shapes.Point2d} p2Position Position of the second shape.
		 * @param {Number} p2Angle Angle of the second shape, in radians from the positive x axis.
		 * @returns {Boolean} True if the shapes collide, false if not.
		 */
		checkPolygonOnPolygonCollision: function(polygon1, p1Position, p1Angle, polygon2, p2Position, p2Angle){
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
					
					if (p1Low === null || projection < p1Low){p1Low = projection;}
					if (p1High === null || projection > p1High){p1High = projection;}
				}
				
				for (var vIndex in p2v){
					projection = p2v[vIndex].toVector().scalarProjection(normal);
					
					if (p2Low === null || projection < p2Low){p2Low = projection;}
					if (p2High === null || projection > p2High){p2High = projection;}
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
define(['math/vector2d'], /** @lends Polygon */ function(Vector2d){
	
	/**
	 * A polygon defined by a list of vertices.
	 * @class
	 * @memberof Thruster.Shapes
	 * @param {Thruster.Shapes.Point2d[]} vertices An array of points defining the vertices of this polygon.
	 */
	var Polygon = function(vertices){
		// Private properties
		var _vertices = [],
			_normals = [];
		
		var calculateNormals = function(){
			_normals = [];
			
			var p1, p2, vector;
			for (var i = 0; i < _vertices.length; i++){
				p1 = _vertices[i];
				p2 = (i < _vertices.length - 1) ? _vertices[i + 1] : _vertices[0];
				
				vector = p1.vectorTo(p2);
				
				_normals.push(new Vector2d(vector.y, -vector.x).normalize());
			}
		};
		
		
		// Privileged functions
		
		/**
		 * Returns the vertices of this polygon, after any optional positioning transformations have been applied.
		 * @param {Thruster.Shapes.Point2d} [position=null] The position of the shape.
		 * @param {Number} [rotation=0] Rotation angle to apply to the shape, in radians from the positive x axis.
		 * @returns {Thruster.Shapes.Point2d} An array of points representing the vertices of this polygon.
		 */
		this.getVertices = function(position, rotation){
			var vertices = [];
			rotation = rotation || 0;
			position = position ? position.toVector() : null;
			
			var v;
			for (var i in _vertices){
				v = _vertices[i].clone();
				
				// Rotate points around the local origin.
				if (rotation !== 0){
					v.rotateAboutOrigin(rotation);
				}
				
				// Translate points to position in world space.
				if (position !== null){
					v.translateByVector(position);
				}
				
				vertices.push(v);
			}
			
			return vertices;
		};
		
		/**
		 * Redefine this polygon with a new set of vertices.
		 * @param {Thruster.Shapes.Point2d[]} vertices An array of points representing the vertices of this polygon.
		 * @returns {Thruster.Shapes.Polygon} This polygon, to allow chaining.
		 */
		this.setVertices = function(vertices){
			_vertices = [];
			
			for (var i in vertices){
				// Clone points to avoid accidental changes later and to allow the original context to be freed.
				_vertices.push(vertices[i].clone());
			}
			
			calculateNormals();
			
			return this;
		};
		
		/**
		 * Returns the normal vectors for each side of this Polygon.
		 * @param {Number} [rotation=0] Rotation angle to apply to the shape, in radians from the positive x axis. 
		 * @returns {Thruster.Math.Vector2d[]}
		 */
		this.getNormals = function(rotation){
			var normals = [];
			rotation = rotation || 0;
			
			var n;
			for (var i in _normals){
				n = _normals[i].clone();
				
				if (rotation !== 0){
					n.rotate(rotation);
				}
				normals.push(n);
			}
			
			return normals;
		};

		
		if (vertices){
			this.setVertices(vertices);
		}
	};
	
	return Polygon;
	
});
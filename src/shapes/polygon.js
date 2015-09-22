define(['math/vector2d'], function(Vector2d){
	
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
		 * Returns the vertices of this polygon, after any rotation and offsets have been applied.
		 * @returns {Array} An array of points representing the vertices of this polygon.
		 */
		this.getVertices = function(){
			return _vertices;
		};
		
		/**
		 * Redefine this polygon with a new set of vertices.
		 * @param {Thruster.Shaped.Point2d[]} vertices An array of points representing the vertices of this polygon.
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
		 * @returns {Thruster.Shapes.Point2d[]}
		 */
		this.getNormals = function(){
			return _normals;
		};

		
		if (vertices){
			this.setVertices(vertices);
		}
	};
	
	return Polygon;
	
});
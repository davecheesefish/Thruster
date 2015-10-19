define(function(){
	
	/**
	 * A dynamic bitmap drawing surface which can be drawn to, blitted and manipulated.
	 * @class
	 * @memberof thruster.graphics
	 * @param {Element} canvasElement An HTML Canvas element. Anything drawn to this surface
	 * will appear on the canvas.
	 *//**
	 * A dynamic bitmap drawing surface which can be drawn to, blitted and manipulated.
	 * @class
	 * @memberof thruster.graphics
	 * @param {Number} width Width of the surface in texels.
	 * @param {Number} height Height of the surface in texels.
	 */
	var Surface = function(width, height){
		var _canvas, _context;
		
		if (width instanceof Element){
			_canvas = width;
		} else {
			_canvas = document.createElement('canvas');
			_canvas.width = width;
			_canvas.height = height;
		}
		
		_context = _canvas.getContext('2d');
		
		
		/**
		 * Clears this surface, filling it with the specified color if specified.
		 * @public
		 * @param {thruster.graphics.color} [color]
		 */
		this.clear = function(color){
			var w = _canvas.width,
				h = _canvas.height;
			
			_context.save();
			
			// Reset transform so the clear affects the whole surface.
			_context.setTransform(1, 0, 0, 1, 0, 0);
			
			if (( ! color) || color.alpha !== 1){
				// If no color is specified or the color is semi-transparent, clear the surface first.
				_context.clearRect(0, 0, w, h);
			}
			
			if (color){
				// If a color is specified, fill the surface with it.
				_context.fillStyle = color.toRgba();
				_context.fillRect(0, 0, w, h);
			}
			
			_context.restore();
		};
		
		/**
		 * Returns the 2D drawing context for this surface. This should only be used for advanced
		 * operations.
		 * @public
		 * @returns {CanvasRenderingContext2D}
		 */
		this.getContext = function(){
			return _context;
		};
		
		/**
		 * Multiplies the current transformation matrix by the matrix provided.
		 * @public
		 * @param {thruster.math.Matrix} matrix
		 */
		this.transform = function(matrix){
			_context.transform(
				matrix.values[0][0], matrix.values[0][1], matrix.values[0][2],
				matrix.values[1][0], matrix.values[1][1], matrix.values[1][2]
			);
		};
		
		/**
		 * Sets the transformation matrix to the matrix provided.
		 * @public
		 * @param {thruster.math.Matrix} matrix
		 */
		this.setTransform = function(matrix){
			_context.setTransform(
				matrix.values[0][0], matrix.values[0][1], matrix.values[0][2],
				matrix.values[1][0], matrix.values[1][1], matrix.values[1][2]
			);
		};
	};
	
	return Surface;
	
});
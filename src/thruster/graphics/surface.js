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
		 * Returns the 2D drawing context for this surface. This should only be used for advanced
		 * operations.
		 * @returns {CanvasRenderingContext2D}
		 */
		this.getContext = function(){
			return _context;
		};
	};
	
	return Surface;
	
});
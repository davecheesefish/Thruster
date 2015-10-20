define(['thruster/math/matrix', 'thruster/math/vector2d'], function(Matrix, Vector2d){
	
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
		/**
		 * The 2D rendering context of the internal canvas.
		 * @private
		 * @type {CanvasRenderingContext2D}
		 */
		var _canvas;
		
		/**
		 * The canvas element where graphics on this surface are drawn to.
		 * @private
		 * @type {HTMLCanvasElement}
		 */
		var _context;
		
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
		 * @param {thruster.graphics.Color} [color]
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
		 * Draw a texture to the surface.
		 * @public
		 * @param {thruster.content.Texture} texture    The texture to draw.
		 * @param {thruster.shapes.Point2d}  position   The position on the canvas to draw the texture.
		 * @param {Number}                   [angle=0]  The angle of rotation, clockwise in radians.
		 * @param {thruster.shapes.Point2d}  [origin]   The point on the texture to use as the origin
		 * for transformations. Defaults to the top-left corner of the texture, (0, 0).
		 * @param {Number}                   [scaleX=1] Scale factor along the x axis.
		 * @param {Number}                   [scaleY=1] Scale factor along the y axis.
		 */
		this.draw = function(texture, position, angle, origin, scaleX, scaleY){
			angle = angle || 0;
			scaleX = (typeof scaleX == 'undefined' ? 1 : scaleX);
			scaleY = (typeof scaleY == 'undefined' ? 1 : scaleY);
			
			// Save the config so we can restore afterwards.
			this.saveConfig();
			
			// Construct transformation matrix. Remember, transformations are applied in the
			// opposite order to the way they are multiplied.
			// Position
			var transform = Matrix.translation(position.toVector());
			
			// Angle
			if (angle !== 0){
				transform.multiply(Matrix.rotation(angle));
			}
			
			// Scale
			if (scaleX != 1 || scaleY != 1){
				transform.multiply(Matrix.scaleXY(scaleX, scaleY));
			}
			
			// Origin
			if (typeof origin != 'undefined'){
				var originVector = origin.toVector().multiply(-1);
				transform.multiply(Matrix.translation(originVector));
			}
			
			// Apply the transformation.
			this.transform(transform);
			
			// Draw the image.
			_context.drawImage(texture.image, 0, 0);
			
			// Restore the config.
			this.restoreConfig();
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
		 * Restore the last surface config saved with [saveConfig()]{@link thruster.graphics.Surface#saveConfig}.
		 * @public
		 * @see thruster.graphics.Surface#saveConfig
		 */
		this.restoreConfig = function(){
			_context.restore();
		};
		
		/**
		 * Saves the current config (transform, fill styles, stroke styles, etc.) so it can be restored later.
		 * @public
		 * @see thruster.graphics.Surface#restoreConfig
		 */
		this.saveConfig = function(){
			_context.save();
		};
		
		/**
		 * Multiplies the current transformation matrix by the matrix provided.
		 * @public
		 * @param {thruster.math.Matrix} matrix
		 */
		this.transform = function(matrix){
			_context.transform(
				matrix.values[0][0], matrix.values[1][0], matrix.values[0][1],
				matrix.values[1][1], matrix.values[0][2], matrix.values[1][2]
			);
		};
		
		/**
		 * Enables or disables image smoothing on this surface.
		 * @param {Boolean} enabled If true, image smoothing is enabled. If false, smoothing is disabled.
		 */
		this.setImageSmoothing = function(enabled){
			_context.mozIMageSmoothingEnabled = enabled;
			_context.msImageSmoothingEnabled = enabled;
			_context.imageSmoothingEnabled = enabled;
		};
		
		/**
		 * Sets the transformation matrix to the matrix provided.
		 * @public
		 * @param {thruster.math.Matrix} matrix
		 */
		this.setTransform = function(matrix){
			_context.setTransform(
				matrix.values[0][0], matrix.values[1][0], matrix.values[0][1],
				matrix.values[1][1], matrix.values[0][2], matrix.values[1][2]
			);
		};
	};
	
	return Surface;
	
});
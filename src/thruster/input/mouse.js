define(['thruster/input/mousestate', 'thruster/shapes/point2d'], /** @lends Mouse */ function(MouseState, Point2d, undefined){
	
	/**
	 * Class responsible for tracking the state of the mouse within a particular DOM element's context.
	 * @class
	 * @memberof thruster.input
	 * @param {Element} element The DOM element to bind to.
	 */
	var Mouse = function(element){
		/**
		 * The DOM element this Mouse is bound to.
		 * @private
		 * @type {Element}
		 */
		var _element = element;
		
		/**
		 * Current position of the mouse cursor.
		 * @private
		 * @type {thruster.shapes.Point2d}
		 */
		var _cursorPosition = new Point2d(0, 0);
		
		/**
		 * Position of the mouse cursor during the last update.
		 * @private
		 * @type {thruster.shapes.Point2d}
		 */
		var _previousCursorPosition;
		
		/**
		 * Current state of the mouse buttons as a bit field.
		 * @private
		 * @type {Number}
		 */
		var _buttonState = 0;
		
		/**
		 * Value of _buttonState during the last update.
		 * @private
		 * @type {Number}
		 */
		var _previousButtonState;
		
		/**
		 * The movement of the mouse wheel in the y direction since the last update.
		 * We use delta instead of a cumulative value to avoid any chance of an overflow
		 * (that said, someone would have to scroll a long way to cause an overflow).
		 * @private
		 * @type {Number}
		 */
		var _wheelDelta = 0;
		
		/**
		 * 
		 * @private
		 */
		var _buttonValues = [1, 4, 2];
		
		/**
		 * MouseState representing the state of the mouse at the beginning of this update loop.
		 * This is used to ensure all instances using the mouse during an update loop see the same state.
		 * @private
		 * @type {thruster.input.MouseState}
		 */
		var _currentState;
		
		/**
		 * Event handler for mousedown events.
		 * @private
		 */
		var _onMouseDown = function(e){
			e = e || window.event;
			
			if (e.buttons !== undefined){
				_buttonState = e.buttons;
			} else {
				// Get equivalent e.buttons value.
				var buttons = [1, 4, 2],
					button = buttons[e.button];
				
				// Store button state as a bit field.
				_buttonState = _buttonState | button;
			}
		};
		
		/**
		 * Event handler for mouseup events.
		 * @private
		 */
		var _onMouseUp = function(e){
			e = e || window.event;
			
			if (e.buttons !== undefined){
				_buttonState = e.buttons;
			} else {
				// Get equivalent e.buttons value.
				var buttons = [1, 4, 2],
					button = buttons[e.button];
				
				// Store button state as a bit field.
				_buttonState = _buttonState & ~button;
			}
		};
		
		/**
		 * Event handler for mousemove events.
		 * @private
		 */
		var _onMouseMove = function(e){
			e = e || window.event;
			
			// Update stored positions
			_cursorPosition.x = e.clientX;
			_cursorPosition.y = e.clientY;
		};
		
		/**
		 * Event handler for wheel events.
		 * Currently wheel delta is only tracked in the y direction.
		 * @private
		 */
		var _onWheel = function(e){
			e = e || window.event;
			
			// Add to current delta.
			_wheelDelta += e.deltaY;
		};
		
		
		/**
		 * Attaches the necessary event handlers to receive incoming mouse events from the bound element.
		 * Called automatically during construction.
		 * @public
		 */
		this.attach = function(){
			_element.addEventListener('mousedown', _onMouseDown, true);
			_element.addEventListener('mouseup',   _onMouseUp,   true);
			_element.addEventListener('mousemove', _onMouseMove, true);
			_element.addEventListener('wheel',     _onWheel,     true);
		};
		
		/**
		 * Detaches all event listeners created by this instance. This should be called before discarding
		 * the instance to avoid memory leaks.
		 * @public
		 */
		this.detach = function(){
			_element.removeEventListener('mousedown', _onMouseDown, true);
			_element.removeEventListener('mouseup',   _onMouseUp,   true);
			_element.removeEventListener('mousemove', _onMouseMove, true);
			_element.removeEventListener('wheel',     _onWheel,     true);
		};
		
		/**
		 * Returns the current state of the mouse.
		 * @public
		 * @returns {thruster.input.MouseState}
		 */
		this.getState = function() {
			return _currentState;
		};
		
		/**
		 * Updates the internal state.
		 * @public
		 */
		this.update = function() {
			_currentState = new MouseState(_cursorPosition, _buttonState, _wheelDelta, _previousCursorPosition, _previousButtonState);
			
			_wheelDelta = 0;
			_previousButtonState = _buttonState;
			_previousCursorPosition = _cursorPosition.clone(); // Clone to prevent changes from affecting both properties.
		};
		
		
		// Constructor
		this.attach();
		this.update();
	};
	
	return Mouse;
});
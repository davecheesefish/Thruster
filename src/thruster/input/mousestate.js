define(/** @lends MouseState */ function(undefined){
	
	/**
	 * The state of the mouse at a single point in time.
	 * @class
	 * @memberof thruster.input
	 * @param {thruster.shapes.Point2d} cursorPosition The current position of the cursor, relative to the element the mouse is bound to.
	 * @param {Number} buttonState State of the mouse buttons, as a bit field.
	 * @param {thruster.shapes.Point2d} [previousCursorPosition] The position of the cursor during the previous update.
	 * @param {Number} [previousButtonState] The state of the mouse buttons during the previous update. 
	 */
	var MouseState = function(cursorPosition, buttonState, wheelDelta, previousCursorPosition, previousButtonState){
		var _cursorPosition = cursorPosition.clone(),
			_buttonState = buttonState,
			_wheelDelta = wheelDelta,
			_previousCursorPosition = (typeof previousCursorPosition !== 'undefined' ? previousCursorPosition.clone() : _cursorPosition),
			_previousButtonState = (typeof previousButtonState !== 'undefined' ? previousButtonState : _buttonState);
		
		/**
		 * Returns whether the given button was pressed during the last update loop.
		 * @private
		 * @param {thruster.input.MouseButtons} buttons The button to check.
		 * @returns {Boolean} True if the button is pressed, false if not.
		 */
		var _buttonWasDown = function(button){
			return !!(button & _previousButtonState);
		};
		
		
		/**
		 * Returns whether the given button is pressed down.
		 * @public
		 * @param {thruster.input.MouseButtons} buttons The button to check.
		 * @returns {Boolean} True if the button is pressed, false if not.
		 */
		this.buttonIsDown = function(button){
			// Use the argument as a bit mask on _buttonState, then convert to boolean.
			return !!(button & _buttonState);
		};
		
		/**
		 * Returns whether the given button was pressed down since the last update.
		 * @param {thruster.input.MouseButtons} buttons The button to check.
		 * @returns {Boolean} True if the button was pressed down, false if not.
		 */
		this.buttonWasPressed = function(button){
			return this.buttonIsDown(button) && ! _buttonWasDown(button);
		};
		
		/**
		 * Returns whether the given button was released since the last update.
		 * @param {thruster.input.MouseButtons} buttons The button to check.
		 * @returns {Boolean} True if the button was released, false if not.
		 */
		this.buttonWasReleased = function(button){
			return _buttonWasDown(button) && ! this.buttonIsDown(button);
		};
		
		/**
		 * Returns the displacement of the mouse cursor since the last update.
		 * @public
		 * @returns {thruster.math.Vector2d}
		 */
		this.getDisplacement = function(){
			return _previousCursorPosition.vectorTo(_cursorPosition);
		};
		
		/**
		 * Returns the current position of the mouse cursor, relative to the element the mouse is bound to.
		 * @public
		 * @returns {thruster.shapes.Point2d}
		 */
		this.getPosition = function(){
			return _cursorPosition;
		};
		
		/**
		 * Returns the mouse wheel movement since the last update.
		 * @public
		 * @returns {Number} The mouse wheel movement, in arbitrary units.
		 */
		this.getWheelDelta = function(){
			return _wheelDelta;
		};
	};
	
	return MouseState;
	
});
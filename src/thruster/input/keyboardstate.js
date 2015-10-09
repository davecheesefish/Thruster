define(/** @lends KeyboardState */ function(undefined){
	
	/**
	 * Class representing the current state of the keys on the keyboard.
	 * @class
	 * @memberof thruster.input
	 * @param {thruster.input.Key[]} pressedKeys An array of currently pressed keys.
	 * @param {thruster.input.Key[]} [previousPressedKeys] The value of pressedKeys from the previous update loop. Used to check if a key has just been pressed or released.
	 */
	var KeyboardState = function(pressedKeys, previousPressedKeys){
		/**
		 * An object (indexed by key identifiers) of pressed keys.
		 * @private
		 */
		var _pressedKeys = pressedKeys ? pressedKeys.slice(0) : [];
		
		/**
		 * The state of _pressedKeys during the last update.
		 * @private
		 */
		var _previousPressedKeys = previousPressedKeys !== undefined ? previousPressedKeys.slice(0) : _pressedKeys;
		
		/**
		 * Check whether the given key is in _previousPressedKeys.
		 * @private
		 * @param {thruster.input.Key} key The key to check.
		 * @returns {Boolean} True if the key is pressed, false if not.
		 */
		function _keyWasDown(key){
			for (var i in _previousPressedKeys){
				if (key.equals(_previousPressedKeys[i])){
					return true;
				}
			}
			
			return false;
		};
		
		/**
		 * Check whether the given key is currently pressed down.
		 * @public
		 * @param {(thruster.input.Keys|thruster.input.Key)} key The key to check.
		 * @returns {Boolean} True if the key is pressed, false if not.
		 */
		this.keyIsDown = function(key){
			// Check if key is in _pressedKeys.
			for (var i in _pressedKeys){
				if (key.equals(_pressedKeys[i])){
					return true;
				}
			}
			
			return false;
		};
		
		/**
		 * Check whether the given key was pressed down since the last update.
		 * @public
		 * @param {thruster.input.Key} key The key to check.
		 * @returns {Boolean} True if the key was pressed since the last update, false if not.
		 */
		this.keyWasPressed = function(key){
			return (this.keyIsDown(key) && ! _keyWasDown(key));
		};
		
		/**
		 * Check whether the given key was released since the last update.
		 * @public
		 * @param {thruster.input.Key} key The key to check.
		 * @returns {Boolean} True if the key was released since the last update, false if not.
		 */
		this.keyWasReleased = function(key){
			return ( ! this.keyIsDown(key) && _keyWasDown(key));
		};
	};
	
	return KeyboardState;
	
});
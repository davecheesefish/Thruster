define(['thruster/input/keyboardstate', 'thruster/input/key'], function(KeyboardState, Key, undefined){
	
	/**
	 * Class responsible for tracking the state of the keyboard within a particular DOM element's context.
	 * @class
	 * @memberof thruster.input
	 * @param {Element} element The DOM element to bind to.
	 */
	var Keyboard = function(element){
		/**
		 * The element this keyboard is bound to.
		 * @private
		 * @type {Element}
		 */
		var _element = element;
		
		/**
		 * Whether the event listeners have been bound yet or not.
		 * @private
		 * @type {Boolean}
		 */
		var _listenersBound = false;
		
		/**
		 * Array of currently pressed keys.
		 * @private
		 * @type {thruster.input.Key[]}
		 */
		var _pressedKeys = [];
		
		/**
		 * The state of _pressedKeys during the last update.
		 * @private
		 * @type {thruster.input.Key[]}
		 */
		var _previousPressedKeys = [];
		
		/**
		 * Cached current state of this keyboard.
		 * Not using this cache would result in some instances seeing a different keyboard state to others. For example,
		 * if a key was released near the end of the update loop most instances wouldn't register it until the next loop.
		 * @private
		 * @type {thruster.input.KeyboardState}
		 */
		var _currentState;
		
		/**
		 * Event handler for keydown events.
		 * @private 
		 */
		var _onKeyDown = function(e){
			e = e || window.event;
			
			var key = Key.fromEventObject(e),
				alreadyPressed = false;
			
			if (key === false){
				// Pressed key could not be determined.
				return;
			}
			
			for (var i in _pressedKeys){
				if (key.equals(_pressedKeys[i])){
					alreadyPressed = true;
					break;
				}
			}
			
			if ( ! alreadyPressed){
				_pressedKeys.push(key);
			}
		};
		
		/**
		 * Event handler for keyup events.
		 * @private 
		 */
		var _onKeyUp = function(e){
			e = e || window.event;
			var key = Key.fromEventObject(e),
				keyIndex;
			
			if (key === false){
				// Pressed key could not be determined.
				return;
			}
			
			for (keyIndex in _pressedKeys){
				if (key.equals(_pressedKeys[keyIndex])){
					break;
				}
			}
			
			if (keyIndex !== undefined){
				_pressedKeys.splice(keyIndex, 1);
			}
		};
		
		
		/**
		 * Attaches the event listeners required to receive keyboard events from the bound element.
		 * Called automatically during construction.
		 * @public
		 */
		this.attach = function(){
			// Prevent event listeners from being bound multiple times.
			if ( ! _listenersBound){
				_element.addEventListener('keydown', _onKeyDown, true);
				_element.addEventListener('keyup',   _onKeyUp,   true);
				_listenersBound = true;
			}
		};
		
		/**
		 * Detaches all event listeners created by this instance. This should be called before discarding
		 * the instance to avoid memory leaks.
		 * @public
		 */
		this.detach = function(){
			_element.removeEventListener('keydown', _onKeyDown, true);
			_element.removeEventListener('keyup',   _onKeyUp,   true);
			_listenersBound = false;
		};
		
		/**
		 * Get the current state of the keyboard.
		 * @public
		 * @returns {thruster.input.KeyboardState}
		 */
		this.getState = function(){
			return _currentState;
		};
		
		/**
		 * Updates the internal state. Should be called once at the start of each update loop.
		 * @public
		 */
		this.update = function(){
			// Update cached state.
			_currentState = new KeyboardState(_pressedKeys, _previousPressedKeys);
			
			// Clone array to ensure later changes to _pressedKeys don't carry over.
			_previousPressedKeys = _pressedKeys.slice(0);
		};
		
		
		// Constructor
		this.attach();
		this.update();
	};
	
	return Keyboard;
	
});